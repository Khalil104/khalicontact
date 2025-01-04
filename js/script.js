// Gestionnaire d'événement pour le formulaire
document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Veuillez téléverser un fichier CSV ou VCF.');
      return;
    }
  
    const fileType = file.name.split('.').pop().toLowerCase();
    if (fileType !== 'csv' && fileType !== 'vcf') {
      alert('Format non supporté. Veuillez téléverser un fichier CSV ou VCF.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const content = event.target.result;
  
      let result;
      if (fileType === 'csv') {
        result = processCSV(content);
      } else if (fileType === 'vcf') {
        result = processVCF(content);
      }
  
      downloadFile(result, fileType);

      showSuccessMessage();
    };
    reader.readAsText(file);
});
  
  // Traitement des fichiers CSV
  function processCSV(content) {
    const lines = content.split('\n');
    return lines
      .map((line) => {
        const columns = line.split(',');
        if (columns.length > 0) {
          const phone = columns.find((col) => /^\+?\d+$/.test(col.trim()));
          if (phone) {
            const updatedPhone = convertPhone(phone.trim());
            return line.replace(phone, updatedPhone);
          }
        }
        return line;
      })
      .join('\n');
  }
  
  // Traitement des fichiers VCF
  function processVCF(content) {
    return content
      .split('\n')
      .map((line) => {
        if (line.startsWith('TEL')) {
          const phone = line.split(':')[1];
          const updatedPhone = convertPhone(phone.trim());
          return line.replace(phone, updatedPhone);
        }
        return line;
      })
      .join('\n');
  }

  // Conversion des numéros
  function convertPhone(phone) {
    if (phone.startsWith('+229 ')) {
      return '+229 01' + phone.slice(6);
    } else if (phone.startsWith('+229')) {
      return '+229 01' + phone.slice(4);
    } else if (/^\d+$/.test(phone)) {
      return '01' + phone;
    }
    return phone;
  }
  
  // Téléchargement du fichier converti
  function downloadFile(content, fileType) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-convert.${fileType}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Affiche le message de succès 
  function showSuccessMessage(){
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Conversion réussite ! </strong>Vos contacts ont été mise à jour avec succès.<button type="button" class="btn-close" data-bs-dismiss="alert" arial-label="close"></button></div>'; 
  }

// Gestion de l'affichage de "Comment ça marche"
document.getElementById('how-it-works-toggle').addEventListener('change', function () {
    const descriptionDiv = document.getElementById('how-it-works-description');
    if (this.checked) {
    descriptionDiv.style.display = 'block'; // Affiche la description
    } else {
    descriptionDiv.style.display = 'none'; // Masque la description
    }
});
  
  
  