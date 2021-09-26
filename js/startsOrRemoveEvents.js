document.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (document.URL.includes('#3')) startSkinningTextMorphing()
        else stopSkinningTextMorphing()
    } else if (e.key === 'Escape') {
        stopSkinningTextMorphing()
    }
});