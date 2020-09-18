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
    },
    cpfCnpj(value){
        value = value.replace(/\D/g , "")

        if(value.length>14){
            value=value.slice(0,-1)
        }
        //verificar se é cpf ou cnpj 11222333444455
        if(value.length>11){
            //11.222333444455
            value=value.replace(/(\d{2})(\d)/,"$1.$2")
            //11.222.333444455
            value=value.replace(/(\d{3})(\d)/,"$1.$2")
            //11.222.333/444455
            value=value.replace(/(\d{3})(\d)/,"$1/$2")
            //11.222.333/4444-55
            value=value.replace(/(\d{4})(\d)/,"$1-$2")
            

        }else{
            value=value.replace(/(\d{3})(\d)/,"$1.$2")
            value=value.replace(/(\d{3})(\d)/,"$1.$2")
            value=value.replace(/(\d{3})(\d)/,"$1-$2")
        }
        return value
    },
    cep(value){
        value = value.replace(/\D/g , "")
        if(value.length>8){
            value=value.slice(0,-1)
        }

        value=value.replace(/(\d{5})(\d)/,"$1-$2")


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


const ImageGallery={
    imagePanel:document.querySelector(".galeria .foco img"),
    divElements:document.querySelectorAll(".galeria .galeria-preview > img"),
    setImage(event){
        let imageClick=event.target

        for(element of this.divElements){
            element.classList.remove("active")
        }
        imageClick.classList.add("active")
        this.imagePanel.src=imageClick.src
        Modal.image.src=imageClick.src
    }
}

const Modal={
    target: document.querySelector(".foco-modal"),
    image: document.querySelector(".foco-modal img"),
    closeButton: document.querySelector(".foco-modal .foco-modal-close"),
    open(){
        Modal.target.style.opacity=1
        Modal.target.style.top=0
        Modal.target.style.bottom=0
        Modal.closeButton.style.top=0

    },
    close(){
        Modal.target.style.opacity=0
        Modal.target.style.top="-100%"
        Modal.target.style.bottom="initial"
        Modal.closeButton.style.top=0
    }
}

const Validate = {
    apply(input, func){
        this.clearErros(input)
        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error)
            Validate.displayError(input, results.error)
        input.focus()

    },
    displayError(input, error){
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErros(input){
        const errorDiv = input.parentNode.querySelector(".error")
        if(errorDiv)
            errorDiv.remove()
    },
    isEmail(value){
        let error = null
        const mailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error="Email invalido"
        
        return{
            error,
            value
        }
    },
    isCpfCnpj(value){
        let error = null

        const cleanValues = value.replace(/\D/g , "")

        if(cleanValues.length>11 && cleanValues.length !== 14){
            error = "CNPJ incorreto"
        }else if(cleanValues.length<12 && cleanValues.length !== 11){
            error = "CPF incorreto"
        }


        return{
            error,
            value
        }
    },
    isCep(value){
        let error = null

        const cleanValues = value.replace(/\D/g , "")

        if(cleanValues.length !==8){
            error= "CEP incorreto"
        }

        return{
            error,
            value
        }
    }
}