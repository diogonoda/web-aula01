import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {
  falha = { sucesso: false, texto: "Problemas no envio do formulario de contato!" }
  contatoForm: FormGroup;
  listaErros = [];
  listaResultados = [];

  constructor(private fb: FormBuilder) { }

  mensagensErro = { 'nome': {'required': 'Favor preencher o nome'},
                    'email': { 'required': 'Favor preencher o email',
                               'emailIsValid': 'O formado do email preenchido está incorreto'},
                    'texto': { 'required': 'Favor preencher o texto',
                               'minLenght': 'Você precisa informar um texto com no mínimo 5 caracteres',
                               'maxLength': 'O limite do texo é de 100 caracteres'}
  };

  ngOnInit() {
     this.buildForm();
  }

  buildForm(){
    this.contatoForm = this.fb.group({
      'nome': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'texto': ['', [Validators.required, Validators.minLength(4),
                        Validators.maxLength(100)]]
    })

    this.contatoForm.valueChanges.subscribe(
      data => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onSubmit() {}

  onValueChanged(data?: any) {
    if(!this.contatoForm) return;

    this.listaErros = [];

    for(const field in this.contatoForm.controls){
      var control = this.contatoForm.get(field);

      if(control && control.dirty && !control.valid){
        for(const error in control.errors) {
          this.listaErros.push(
            {
              sucesso: false,
              texto: this.mensagensErro[field][error]
            }
          );
        }
      }
    }
  }
}
