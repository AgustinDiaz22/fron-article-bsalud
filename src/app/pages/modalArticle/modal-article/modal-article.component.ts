import { Component, OnInit, Input, ViewEncapsulation, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalServiceService } from '../modal-service.service';
import { Article } from '../../interfaces/articles.interfaces';
@Component({
  selector: 'app-modal-article',
  templateUrl: './modal-article.component.html',
  styleUrls: ['./modal-article.component.css']
})
export class ModalArticleComponent implements OnInit {
  @Input() article: any;
  public movementForm: FormGroup;
  constructor(

    public _modalService: NgbModal,
    public _ModalServiceService: ModalServiceService,
    public activeModal: NgbActiveModal,
    public alertConfig: NgbAlertConfig,

  ) { }

  ngOnInit() {
    console.log(this.article)
    this.movementForm = new FormGroup({
      movimiento: new FormControl()
    });
  }
  public addMovement(): void {
    this.article.movement = this.movementForm.value.movimiento
    this._ModalServiceService.saveMovement(this.article).subscribe(r => {
      if (r.status == 200) {
        this.activeModal.dismiss('close_click')
      } else if (r.status == 500) {
        console.log(r)
      }
    })
  }

}
