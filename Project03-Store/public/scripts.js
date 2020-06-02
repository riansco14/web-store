const Mask = {
    apply(input, func){
        setTimeout(function(){
            input.value=Mask[func](input.value)        
        }, 10)
        console.log(Mask[func]);
        
    },
    formatBRL(value){
        value = value.replace(/\D/g , "") //remove digitos que n sejam numeros
        value = new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
        
        return value
    }
}

const FotoUpload={
    input: "",
    fotosPreview: document.querySelector("#fotos-preview"),
    uploadLimit: 6,
    files: [],  
    handleFile(event){
        FotoUpload.input = event.target
        const {files: fileList} = event.target
        const {uploadLimit,fotosPreview} = FotoUpload

        //Limite de fotos
        if ( fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return
        }

        fotosDiv=[]
        fotosPreview.childNodes.forEach(item =>{
            if(item.classList && item.classList.value== "foto"){
                fotosDiv.push(item)
            }
        })

        const totalFotos = fileList.length + fotosDiv.length
        if(totalFotos > uploadLimit){
            alert("Você atingiu o limite de fotos")
            event.preventDefault()
            return
        }
         //END Limite de fotos



        Array.from(fileList).forEach(file =>{
            FotoUpload.files.push(file)
            
            const reader= new FileReader();

            reader.onload= () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = FotoUpload.getContainer(image)
                FotoUpload.fotosPreview.appendChild(div)

            }   

            reader.readAsDataURL(file)

        })

        event.target.files = this.getAllFiles()
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
        FotoUpload.files.forEach(file => dataTransfer.items.add(file))
        return dataTransfer.files
    },
    getContainer(image){
        const container= document.createElement("div")
        container.classList.add('foto')
        container.onclick = FotoUpload.removeFoto
        container.appendChild(image)

        container.appendChild(FotoUpload.getRemoveButton())

        return container
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML='close'
        return button
    },
    removeFoto(event){
        alert('')
        const fotoDiv = event.target.parentNode
        const fotosArray = Array.from(FotoUpload.fotosPreview)
        const index = fotosArray.indexOf(fotoDiv)

        FotoUpload.files.splice(index, 1)
        FotoUpload.input.files=FotoUpload.getAllFiles()
        fotoDiv.remove()
    },
    removeOldFoto(event){
        const fotoDiv = event.target.parentNode
        
        if(fotoDiv.id){
            const removedFiles=document.querySelector('input[name="removed_files"]')
            if(removedFiles){
                removedFiles.value +=`${fotoDiv.id},`
            }
        }

        fotoDiv.remove()
    }
}