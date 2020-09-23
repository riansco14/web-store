module.exports = {
    date(timestamp) {
        const formattedDate = new Date(timestamp);
        ano = formattedDate.getUTCFullYear();
        mes = String("0" + (formattedDate.getUTCMonth() + 1)).slice(-2);
        dia = String("0" + formattedDate.getUTCDate()).slice(-2);
        hora= formattedDate.getHours();
        minutos= String(formattedDate.getMinutes()).length==1?String("0"+formattedDate.getMinutes()):String(formattedDate.getMinutes());

        return {
            dia,
            mes,
            ano,
            hora,
            minutos,
            iso: `${ano}-${mes}-${dia}`,
        };
    },
    formatPreco(value){
        value = new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
        
        return value
    },
    formatCpfCnpj(value){
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
    formatCep(value){
        value = value.replace(/\D/g , "")
        if(value.length>8){
            value=value.slice(0,-1)
        }

        value=value.replace(/(\d{5})(\d)/,"$1-$2")


        return value
    }
}