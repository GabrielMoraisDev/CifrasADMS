const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Configuração do banco de dados
const db = new sqlite3.Database('DATABASE.db');

// Função para formatar e repetir os parágrafos com os sufixos 2X, 3X, etc.
function formatParagraphs(paragraphs) {
    let formattedText = '';
  
    paragraphs.forEach(paragraph => {
      let text = paragraph.text.trim();
  
      // Verifica e extrai o sufixo numérico no final do texto
      const repeatMatch = text.match(/(\d+)x$/i);
  
      if (repeatMatch) {
        const repeatCount = parseInt(repeatMatch[1], 10); // Converte para número
        const repeatText = text.replace(/(\d+)x$/i, '').trim(); // Remove o sufixo numérico
  
        // Adiciona o parágrafo repetido conforme o sufixo
        for (let i = 0; i < repeatCount; i++) {
          formattedText += `[${repeatText}]\n`; // Adiciona uma quebra de linha após cada parágrafo repetido
        }
      } else {
        // Adiciona parágrafo sem repetição
        formattedText += `[${text}]\n`; // Adiciona uma quebra de linha após parágrafo único
      }
    });
  
    // Remove quebras de linha extras e ajusta a formatação final
    formattedText = formattedText.replace(/\n\n+/g, '\n')
                                 .replace(/\n\s*\[/g, '\n[')
                                 .replace(/\]\s*\[/g, ']\n[')
                                 .trim();
  
    return formattedText;
}

// Função para inserir dados no banco de dados
function insertData(data) {
  const { id, title, note, artist, lyrics } = data;
  const formattedText = formatParagraphs(lyrics.paragraphs);
  const name = title;
  const artista = artist;
  const tom = note;

  const query = `INSERT INTO harpa (id, name, artista, texto, tom) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [id, name, artista, formattedText, tom], function (err) {
    if (err) {
      console.error('Erro ao inserir dados:', err.message);
    } else {
      console.log(`Dados inseridos com sucesso: ${this.lastID}`);
    }
  });
}

// Função para processar arquivos JSON
function processFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err.message);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      if (path.extname(file) === '.json') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Erro ao ler o arquivo:', err.message);
            return;
          }

          try {
            const jsonData = JSON.parse(data);
            insertData(jsonData);
          } catch (parseErr) {
            console.error('Erro ao analisar JSON:', parseErr.message);
          }
        });
      }
    });
  });
}

// Substitua 'harpa' pelo caminho para sua pasta com os arquivos JSON
processFiles('harpa');
