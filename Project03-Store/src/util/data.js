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
    }
}