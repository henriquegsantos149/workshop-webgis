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
  
  // Cabeçalhos básicos
  var headers = ["Data/Hora", "Nome Completo", "E-mail", "WhatsApp"];
  
  // Inicializa planilha se estiver vazia
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
  }

  try {
    // 1. Captura dados básicos
    var rowData = {
      "Data/Hora": Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm:ss"),
      "Nome Completo": e.parameter.nome || "Não informado",
      "E-mail": e.parameter.email || "Não informado",
      "WhatsApp": e.parameter.whatsapp || "Não informado"
    };

    // 2. Captura todas as UTMs dinamicamente
    var allParams = e.parameter;
    var utmKeys = Object.keys(allParams).filter(function(key) {
      return key.toLowerCase().indexOf('utm_') === 0;
    });

    utmKeys.forEach(function(key) {
      rowData[key] = allParams[key];
    });

    // 3. Gerencia colunas dinamicamente
    var currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Verifica se existem novas UTMs que precisam de colunas
    Object.keys(rowData).forEach(function(key) {
      if (currentHeaders.indexOf(key) === -1) {
        sheet.getRange(1, sheet.getLastColumn() + 1).setValue(key)
             .setFontWeight("bold").setBackground("#f3f3f3");
        currentHeaders.push(key);
      }
    });

    // 4. Prepara a linha final baseada na ordem das colunas
    var finalRow = currentHeaders.map(function(header) {
      return rowData[header] || "";
    });

    sheet.appendRow(finalRow);
    
    return ContentService.createTextOutput("Sucesso").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    console.error("Erro no processamento:", error.toString());
    return ContentService.createTextOutput("Erro: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
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
