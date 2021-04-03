export const BlobDownload = (blob: Blob): void => {
    const a = document.createElement("a");
    a.style.display = 'none';
    a.download = 'LetterBomb.zip';
    window.document.body.appendChild(a);
    const objUrl = window.URL.createObjectURL(blob);
    a.href = objUrl;
    a.click();
    window.URL.revokeObjectURL(objUrl);
}
