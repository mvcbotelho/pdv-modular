/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import sgMail from "@sendgrid/mail";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Inicializar Firebase Admin
admin.initializeApp();

// Configurar SendGrid usando variáveis de ambiente
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "sua_api_key_aqui";
const SENDGRID_FROM = process.env.SENDGRID_FROM || "noreply@seudominio.com";

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Envia email de boas-vindas com senha temporária
 */
export const sendWelcomeEmail = onCall(
  {
    maxInstances: 10,
    region: "us-central1",
  },
  async (request) => {
    try {
      const { email, displayName, temporaryPassword, companyName = "PDV System" } = request.data;

      if (!email || !displayName || !temporaryPassword) {
        throw new Error("Dados obrigatórios não fornecidos");
      }

      const msg = {
        to: email,
        from: SENDGRID_FROM,
        subject: `Bem-vindo ao ${companyName}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🎉 Bem-vindo!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Seu acesso foi criado com sucesso</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Olá, ${displayName}!</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Seu acesso ao sistema <strong>${companyName}</strong> foi criado com sucesso. 
                Abaixo estão suas credenciais de acesso:
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="margin: 0 0 15px 0; color: #333;">📧 Suas Credenciais</h3>
                <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Senha temporária:</strong> <span style="background: #fff3cd; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${temporaryPassword}</span></p>
              </div>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #856404;">⚠️ Importante</h4>
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  Por segurança, você será obrigado a trocar sua senha no primeiro acesso ao sistema.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  Acessar Sistema
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                Este é um email automático. Não responda a esta mensagem.
                <br>
                Se você não solicitou este acesso, entre em contato com o administrador.
              </p>
            </div>
          </div>
        `,
      };

      await sgMail.send(msg);
      
      logger.info(`Email de boas-vindas enviado para: ${email}`);
      
      return {
        success: true,
        message: "Email enviado com sucesso",
      };
    } catch (error) {
      logger.error("Erro ao enviar email de boas-vindas:", error);
      throw new Error(`Erro ao enviar email: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
  }
);

/**
 * Envia email de reset de senha
 */
export const sendPasswordResetEmail = onCall(
  {
    maxInstances: 10,
    region: "us-central1",
  },
  async (request) => {
    try {
      const { email, displayName, resetLink, companyName = "PDV System" } = request.data;

      if (!email || !displayName || !resetLink) {
        throw new Error("Dados obrigatórios não fornecidos");
      }

      const msg = {
        to: email,
        from: SENDGRID_FROM,
        subject: `Reset de Senha - ${companyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🔐 Reset de Senha</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Solicitação de nova senha</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Olá, ${displayName}!</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Recebemos uma solicitação para redefinir sua senha no sistema <strong>${companyName}</strong>.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  Redefinir Senha
                </a>
              </div>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #856404;">⚠️ Segurança</h4>
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  Este link é válido por 1 hora. Se você não solicitou esta alteração, ignore este email.
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                Este é um email automático. Não responda a esta mensagem.
              </p>
            </div>
          </div>
        `,
      };

      await sgMail.send(msg);
      
      logger.info(`Email de reset enviado para: ${email}`);
      
      return {
        success: true,
        message: "Email de reset enviado com sucesso",
      };
    } catch (error) {
      logger.error("Erro ao enviar email de reset:", error);
      throw new Error(`Erro ao enviar email de reset: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
  }
);

/**
 * Envia email de notificação de mudança de status
 */
export const sendStatusChangeEmail = onCall(
  {
    maxInstances: 10,
    region: "us-central1",
  },
  async (request) => {
    try {
      const { email, displayName, newStatus, companyName = "PDV System" } = request.data;

      if (!email || !displayName || !newStatus) {
        throw new Error("Dados obrigatórios não fornecidos");
      }

      const statusColors = {
        ativo: "#28a745",
        inativo: "#dc3545",
        suspenso: "#ffc107",
      };

      const statusLabels = {
        ativo: "Ativo",
        inativo: "Inativo",
        suspenso: "Suspenso",
      };

      const msg = {
        to: email,
        from: SENDGRID_FROM,
        subject: `Status Atualizado - ${companyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">📊 Status Atualizado</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Notificação de mudança de status</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Olá, ${displayName}!</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Seu status no sistema <strong>${companyName}</strong> foi atualizado.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusColors[newStatus as keyof typeof statusColors]}">
                <h3 style="margin: 0 0 15px 0; color: #333;">📋 Novo Status</h3>
                <p style="margin: 0; color: #666;">
                  <strong>Status:</strong> 
                  <span style="background: ${statusColors[newStatus as keyof typeof statusColors]}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                    ${statusLabels[newStatus as keyof typeof statusLabels]}
                  </span>
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  Acessar Sistema
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                Este é um email automático. Não responda a esta mensagem.
              </p>
            </div>
          </div>
        `,
      };

      await sgMail.send(msg);
      
      logger.info(`Email de mudança de status enviado para: ${email}`);
      
      return {
        success: true,
        message: "Email de notificação enviado com sucesso",
      };
    } catch (error) {
      logger.error("Erro ao enviar email de mudança de status:", error);
      throw new Error(`Erro ao enviar email de notificação: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
  }
);
