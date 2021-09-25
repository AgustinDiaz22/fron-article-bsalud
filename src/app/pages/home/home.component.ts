import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Article } from '../interfaces/articles.interfaces';
import { ModalArticleComponent } from '../modalArticle/modal-article/modal-article.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalServiceService } from '../modalArticle/modal-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbAlertConfig]
})
export class HomeComponent implements OnInit {
  public allArticles: any
  public allMovement: any
  public pageSize: number = 30;
  public page = 0;
  public pageMovement = 0;
  public loading: boolean;
  public filterArticle = '';
  public filterMovement = '';
  public FILTER_PAG_REGEX = /[^0-9]/g;
  public collectionSize;
  public closeResult: string;
  public modal: any;
  public hide: boolean = false;
  public message: string = ''
  public alertMessage: string = '';
  public movementForm: FormGroup;
  constructor(
    private _homeService: HomeService,
    private _modalService: NgbModal,
    private _toastr: ToastrService,
    public alertConfig: NgbAlertConfig,
    // public activeModal: NgbActiveModal,
    public _ModalServiceService: ModalServiceService,
  ) {

    this.getAllAricles();

    // this.collectionSize = this.allArticles / 
    // 1315

  }


  async ngOnInit() {
    this.movementForm = new FormGroup({
      movimiento: new FormControl()
    });
  }


  public addMovement(article): void {
    this.loading = true
    article.movement = this.movementForm.value.movimiento
    this._ModalServiceService.saveMovement(article).subscribe(r => {
      if (r.status == 200) {
        this.loading = false
        this.movementForm = new FormGroup({
          movimiento: new FormControl()
        });
        this.getAllMovement();
      } else if (r.status == 500) {
        // this.getAllMovement();
      }
    })
  }
  public getAllMovement(): Promise<any> {
    this.loading = true;
    return new Promise<Array<any>>((resolve, reject) => {
      this._homeService.allMovement()
        .subscribe(r => {
          this.allMovement = r
          // console.log(this.allMovement)
          this.loading = false
        })
    })
  }
  public getAllAricles(): Promise<any> {
    this.loading = true;
    return new Promise<Array<any>>((resolve, reject) => {
      this._homeService.allArticles()
        .subscribe(r => {
          this.allArticles = r
          // console.log(this.allArticles)
          this.getAllMovement();
          // this.loading = false
        })

    })
  }
  delete(article: any) {
    this.loading = true;
    return new Promise<Array<any>>((resolve, reject) => {
      this._homeService.deleteMovement(article)
        .subscribe(r => {
          console.log(r)
          if (r.status == 200) {
            // this.message = "Su licencia expiró, por favor, regularice su pago.";
            // this.showToast(this.message, "danger");
            this.showMessage(r.message, 'success', true);
          }
          this.getAllMovement();
          this.loading = false
        })

    })
  }
  open(content: any, article: any) {
    // this.modal=[]
    let modalRef: NgbModalRef;
    console.log('r')
    modalRef = this._modalService.open(ModalArticleComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.article = article;
    console.log('r')
    modalRef.result.then(async (r: any) => {
      let a = await r
      console.log(a)
    })

    // modalRef.result.then(
    //   (result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   });



    //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ocultar() {
    var containerUno = document.getElementById('table1');
    if (this.hide) {
      containerUno.style.display = 'revert';
      this.hide = false
    } else if (!this.hide) {
      containerUno.style.display = 'none';
      this.hide = true
    }
    // ss.cssRules[0].style.backgroundColor = "blue";
  }
  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if (this.page > 0)
      this.page -= 5;
  }

  onSearchArticle(search: string) {
    // console.log(search)
    this.page = 0;
    this.filterArticle = search;
  }

  onSearchMovement(search: string) {
    // console.log(search)
    this.pageMovement = 0;
    this.filterMovement = search;
  }
  nextPageMovement() {
    this.pageMovement += 5;
  }

  prevPageMovement() {
    if (this.pageMovement > 0)
      this.pageMovement -= 5;
  }
  public showMessage(message: string, type: string, dismissible: boolean): void {
    this.alertMessage = message;
    this.alertConfig.type = type;
    this.alertConfig.dismissible = dismissible;
  }
  public showToast(message: string, type: string = 'success'): void {
    switch (type) {
      case 'success':
        this._toastr.success('', message);
        break;
      case 'info':
        this._toastr.info('', message, {
          positionClass: 'toast-bottom-left'
        });
        break;
      case 'warning':
        this._toastr.warning('', message, {
          positionClass: 'toast-bottom-left'
        });
        break;
      case 'danger':
        this._toastr.error('', message, {
          positionClass: 'toast-bottom-left'
        });
        break;
      default:
        this._toastr.success('', message);
        break;
    }
  }

}
