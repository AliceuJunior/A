import mongoose from "mongoose";
const { Schema } = mongoose;

const PessoaSchema = new Schema({
    nome: { type: String, maxlength: [50, "O nome pode ter no máximo 50 caracteres"], required: true },
    idade: { type: Number, },
    email: {
        type: String,
        maxlength: [60, "O e-mail pode ter no máximo 60 caracteres"],
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: [
            {
              validator: function (value: string) {
                // expressão regular para validar o formato do e-mail
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
              },
              message: (props: any) => `${props.value} não é um formato de e-mail válido`,
            },
            {
              validator: function (value: string) {
                // expressão regular para validar domínio específico
                const regex = /^[^\s@]+@(etec|fatec|cps)\.sp\.gov\.br$/;
                return regex.test(value);
              },
              message: (props: any) => `${props.value} deve ser um e-mail do Centro Paula Souza (etec, fatec ou cps).sp.gov.br`,
            }
          ]
        },
        fone: {
          type: String,
          required: true,
          validate: [
            {
              validator: function (value: string) {
                // expressão regular para validar número de telefone
                const regex = /^[0-9]{10,11}$/;
                return regex.test(value);
              },
              message: (props: any) => `${props.value} não é um número de telefone válido. Deve ter de 10 a 11 dígitos.`,
            },
            {
              validator: function (value: string) {
                // validação do DDD
                const ddds = [
                    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 
                    41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 
                    69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 
                    96, 97, 98, 99
                  ];
                const ddd = parseInt(value.substring(0, 2));
                return ddds.includes(ddd);
              },
              message: (props: any) => `${props.value} não possui um DDD válido.`,
            }
          ]
        }
      }, { timestamps: true });

const EstudanteSchema = new Schema({
    ra: { type: Number, maxlength: 10, required: true, unique: true },
    media: {
        type: Number,
        min: [0, 'A média não pode ser menor que 0'],
        max: [10, 'A média não pode ser maior que 10']
      },
    pessoa: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true,
        validate: {
            validator: async function (id: string) {
                const pessoa = await Pessoa.findById(id); // verifica se id existe na coleção pessoa
                return !!pessoa; // true se a pessoa existir
            },
            message: 'A Pessoa fornecida não existe!',
        }
    }
});

const DisciplinaSchema = new Schema({
    descricao: {type: String, required: true },
    curso: { type: String, required: true },
    media: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estudante'},
    semestre: {
        type: Number,
        min: [1, 'O semestre não pode ser menor que 1'],
        max: [10, 'O semestre não pode ser maior que 10'],
        required: [true, 'O semestre é obrigatório']
      }
    });


const Pessoa = mongoose.model("Pessoa", PessoaSchema, "pessoa");
const Estudante = mongoose.model("Estudante", EstudanteSchema);
const Disciplina = mongoose.model("Disciplina", DisciplinaSchema);

export { Pessoa, Estudante, Disciplina };