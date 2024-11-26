const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Configuração do banco de dados
const db = new sqlite3.Database('DATABASE.db');

// Função para formatar os parágrafos com os sufixos 2X, 3X, etc.
function formatParagraphs(paragraphs) {
  return paragraphs.map(paragraph => {
    let text = paragraph.text.trim();

    // Substitui sufixos numéricos no final por maiúsculas (2X, 3X, etc.)
    text = text.replace(/\((\d+x|x\d+|x\d+|x\d+|x\d+)\)$/gi, (match, p1) => {
      const number = p1.toUpperCase().replace(/X/, 'X');
      return number;
    });

    return text;
  }).map(text => `[${text}]\n`).join(' '); // Adiciona uma quebra de linha após cada parágrafo
}

// Função para inserir dados no banco de dados
function insertData(data) {
  const { id, title, note, artist, lyrics } = data;
  const formattedText = formatParagraphs(lyrics.paragraphs);
  const name = title;
  const artista = artist;
  const tom = note;

  // Utilizando "INSERT OR IGNORE" para ignorar a inserção se o ID já existir
  const query = `INSERT OR IGNORE INTO hinos (id, name, artista, texto, tom) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [id, name, artista, formattedText, tom], function (err) {
    if (err) {
      console.error('Erro ao inserir dados:', err.message);
    } else if (this.changes > 0) {
      console.log(`Dados inseridos com sucesso: ${id}`);
    } else {
      console.log(`ID já existente, dados ignorados: ${id}`);
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

// Substitua 'hinos' pelo caminho para sua pasta com os arquivos JSON
processFiles('hinos');
