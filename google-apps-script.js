/**
 * Script para capturar dados do formulário da Landing Page WebGIS
 * Instruções:
 * 1. Abra sua planilha Google
 * 2. Extensões > Apps Script
 * 3. Cole este código
 * 4. Salve e clique em "Implantar" > "Nova Implantação"
 * 5. Tipo: App da Web | Quem pode acessar: Qualquer pessoa
 */

function doPost(e) {
  // Proteção contra execução manual no editor do Apps Script
  if (typeof e === 'undefined' || !e.postData) {
    return ContentService.createTextOutput("O script deve ser acionado via formulário, não manualmente.").setMimeType(ContentService.MimeType.TEXT);
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Leads") || spreadsheet.insertSheet("Leads");
  
  // Garante que a planilha tenha cabeçalhos se estiver vazia
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Data/Hora", "Nome Completo", "E-mail", "WhatsApp"]);
    sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");
  }

  try {
    // Captura os dados no formato de formulário padrão (e.parameter)
    var nome = e.parameter.nome || "Não informado";
    var email = e.parameter.email || "Não informado";
    var whatsapp = e.parameter.whatsapp || "Não informado";
    
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "GMT-3", "dd/MM/yyyy HH:mm:ss");
    
    sheet.appendRow([formattedDate, nome, email, whatsapp]);
    
    return ContentService.createTextOutput("Sucesso").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    // Log para depuração no Apps Script
    console.error("Erro no processamento:", error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Opcional: Adiciona cabeçalhos se a planilha estiver vazia
function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Data/Hora", "Nome Completo", "E-mail", "WhatsApp"]);
    sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");
  }
}
