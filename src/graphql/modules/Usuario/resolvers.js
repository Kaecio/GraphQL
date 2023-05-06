const db = require('../../../db');


const geradorDeId = (lista) => {
    let novoId;
    let ultimo = lista[lista.length - 1];
    if(!ultimo){
         novoId = 0
    } else{
         novoId = ultimo.id;
    }
   return ++ novoId;
}

const deletarUsusarioFiltro = (filtro) => {  
    const chave = Object.keys(filtro)[0]
    const valor = Object.values(filtro)[0]
    const usuarioEncontrado = db.usuario.find(usuario => usuario[chave] === valor);
    db.usuario = db.usuario.filter( usuario => usuario[chave] !== valor)

    return !! usuarioEncontrado
}


module.exports = {
    Usuario:{
        perfil(usuario){
            console.log(usuario)
            return db.perfis.find(db => db.id === usuario.perfil)
        }
    },
    Query:{
        usuario(_, {filtro}){
           if(filtro.id){
            return db.usuario.find(usuario => usuario.id === filtro.id);
           }else{
            return db.usuario.find(usuario => usuario.email === filtro.email);

           }
            
          },
          usuarios: () => db.usuario
        },
        Mutation:{
            criarUsuario(_, {data}){

                const {cpf, nome} = data
                const usuarioExistente = db.usuario.some(usuario => usuario.cpf === cpf) 
                if (usuarioExistente) {
                    throw new Error(`Usuario existente: ${nome}`)
                }

                const novoUsuario = {
                    ...data,
                    id: geradorDeId(db.usuario),
                    perfil_id: 2
                }
                db.usuario.push(novoUsuario)

                return novoUsuario
            },
            atualizarUsuario(_,{id, data}){
                const usuario = db.usuario.find(usuario => usuario.id === id)
                const indice = db.usuario.findIndex(usuario => usuario.id === id)

                const novoUsuario = {
                    ...usuario,
                    ...data,
                }

                db.usuario.splice(indice, 1, novoUsuario)

                return novoUsuario
            },
            deletarUsuario(_,{filtro:{id, email}}) {
               return deletarUsusarioFiltro(id ? {id} : {email}) 
                
            },
            // deletarUsuarioNome(_,{nome}){
            //     const usuarioEncontrado = db.usuario.find(usuario => usuario.id === id)

            // }
        }
    };

