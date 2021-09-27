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

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbAlertConfig]
})
export class HomeComponent implements OnInit {
  public allArticles: any
  public allreason: any
  public pageSize: number = 30;
  public page = 0;
  public pagereason = 0;
  public loading: boolean;
  public filterArticle = '';
  public filterreason = '';
  public FILTER_PAG_REGEX = /[^0-9]/g;
  public collectionSize;
  public closeResult: string;
  public modal: any;
  public hide: boolean = false;
  public message: string = ''
  public alertMessage: string = '';
  public reasonForm: FormGroup;
  public dateSearch: FormGroup;
  public mode: string = '';
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
    this.reasonForm = new FormGroup({
      Motivos: new FormControl()
    });
    this.dateSearch = new FormGroup({
      date1: new FormControl(),
      date2: new FormControl()
    });
  }


  public addreason(article): void {
    this.loading = true
    article.reason = this.reasonForm.value.Motivos
    this._ModalServiceService.savereason(article).subscribe(r => {
      if (r.status == 200) {
        this.loading = false
        this.reasonForm = new FormGroup({
          Motivos: new FormControl()
        });

        // this.getAllreasonStock(this.reasonForm.value.Motivos);
      } else if (r.status == 500) {
        // this.getAllAricles();
      }
    })
  }
  public getAllreasonStock(value: string): Promise<any> {

    this.loading = true;
    let match;
    if (this.dateSearch.value.date1 != null && this.dateSearch.value.date2 != null) {
      match = {
        creationDate: {
          "$gte": new Date(this.dateSearch.value.date1 + "T15:00:00.000+00:00"),
          "$lte": new Date(this.dateSearch.value.date2 + "T15:00:00.000+00:00")
        },
        "reason": value,
        "operationType": { $ne: "D" }
      }
    } else {
      match = {
        "reason": value,
        "operationType": { $ne: "D" }
      }
    }
    return new Promise<Array<any>>((resolve, reject) => {
      this._homeService.allreason(match)
        .subscribe(r => {
          this.allArticles = r;
          this.mode = value;
          this.page = 0;
          this.loading = false
          // console.log(this.allreason)
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
          this.mode = 'ARTICULOS'
          this.loading = false
          // this.getAllreason();
        })

    })
  }
  public exportAsExcelFile(excelFileName: string): void {
    let json = []
    this.allArticles.forEach(element => {
      json.push({
        'Fecha': element.creationDate.substring(0,10),
        'idArticulo': element.idArticulo,
        'Nombre': element.arNombre,
        'Descripcion': element.arDescripcion,
        'Motivo': element.reason
      }
      )
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    excelFileName = excelFileName+json[0].Fecha.substring(0,7)
    this.saveAsExcelFile(excelBuffer, excelFileName);

  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  delete(article: any) {
    this.loading = true;
    return new Promise<Array<any>>((resolve, reject) => {
      this._homeService.deletereason(article)
        .subscribe(r => {
          // console.log(r)
          if (r.status == 200) {
            // this.message = "Su licencia expiró, por favor, regularice su pago.";
            // this.showToast(this.message, "danger");

            this.getAllreasonStock(r.res.reason);
            this.showMessage(r.message, 'success', true);
          }
          this.loading = false
        })

    })
  }
  open(content: any, article: any) {
    // this.modal=[]
    let modalRef: NgbModalRef;
    // console.log('r')
    modalRef = this._modalService.open(ModalArticleComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.article = article;
    // console.log('r')
    modalRef.result.then(async (r: any) => {
      let a = await r
      // console.log(a)
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
