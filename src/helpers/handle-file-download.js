const handleFileDownload = (responseObject, filename) => {
  
    const url = window.URL.createObjectURL(new Blob([responseObject.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}.pdf`);
            document.body.appendChild(link);
            link.click();
}

export default handleFileDownload;