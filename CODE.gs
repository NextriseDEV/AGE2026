function reservarAssento(assentoId, userId) {
  var lock = LockService.getScriptLock();
  
  // 1. Tenta obter acesso exclusivo ao script por 10 segundos
  try {
    lock.waitLock(10000); 
  } catch (e) {
    return { status: 'error', message: 'Servidor ocupado. Tente novamente.' };
  }

  // --- ÁREA SEGURA (Apenas uma execução por vez entra aqui) ---
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Assentos");
  var data = sheet.getDataRange().getValues();
  // Busca o assento
  // Verifica se a coluna "Ocupado Por" está vazia
  
  if (assentoEstaLivre) {
     // Grava o ID do usuário na célula
     sheet.getRange(row, col).setValue(userId);
     lock.releaseLock(); // Libera para o próximo
     return { status: 'success', assento: assentoId };
  } else {
     lock.releaseLock();
     return { status: 'error', message: 'Ops! Alguém acabou de pegar este lugar.' };
  }
}
