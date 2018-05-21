import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {SkinType, InputType} from 'ngx-weui';
import {DialogService, DialogConfig, DialogComponent, ToastService, ToptipsComponent, ToptipsService } from 'ngx-weui';
import {RouterUtil} from './../../../providers/RouterUtil';
import {Logger} from './../../../providers/Logger';
import {Config} from './../../../providers/Config';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';
import {StorageUtil} from "../../../providers/StorageUtil";
import {WalletManager} from "../../../providers/WalletManager";
import {NavController} from "ionic-angular";
import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";



@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  // styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransferComponent extends BaseComponent implements OnInit, OnDestroy {


  @ViewChild('toptips') toptips: ToptipsComponent;
  @ViewChild('auto') autoAS: DialogComponent;

  constructor(
              public log: Logger,
              public translate: TranslateService,
              public location: Location,
              public changeDetectorRef: ChangeDetectorRef,
              private srv: DialogService,
              public storage:StorageUtil,
              private toastService: ToastService,
              @ViewChild('myNav')nav:NavController
              ) {
    super( log, translate, location, changeDetectorRef,storage,nav);
  }

  con: DialogConfig = {};


  transfer: any = {
    toAdd: '',
    amount: '',
    remark: '',
    fees: '',
    payfees: 2
  };

  balance = 1.0;


  DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '支付密码',
    content: '',
    cancel: '取消',
    confirm: '确认',
    inputPlaceholder: '密码',
    inputError: '错误的密码',
    inputRequired: true,
    inputAttributes: {
      maxlength: 140,
      cn: 2
    }
  };


  ngOnInit() {
    this.setTitleByAssets('text-transfer');

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      Logger.info('扫码');
    });

    this.setHeadDisPlay({right: true});

    //Logger.info(this.autoAS);


  }

  onClick(type) {
    switch (type) {
      case 1:
        this.Go(ContactListComponent);
        break;
      case 2:   // 转账
        this.checkValue();
        break;
    }

  }

  checkValue() {
    // this.toptips.type = 'warn';
    // if (this.checkNull(this.transfer.toAdd)) {
    //   this.toptips.text = '请输入正确的地址';
    //   this.toptips.onShow();
    //   return ;
    // }
    //
    // if (this.checkNull(this.transfer.amount)) {
    //   this.toptips.text = '请输入正确的金额';
    //   this.toptips.onShow();
    //   return ;
    // }

    //this.onShowPrompt();
  }



  onShowPrompt() {
    const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
      skin: 'auto',
      type: 'prompt',
      content: '发送地址:' + this.transfer.toAdd + '<br/><br/>金额：' + this.transfer.amount,
      confirm: '确认',
      cancel: '取消',
      input: 'password',
      inputValue: undefined,
      inputRegex: null

    });

    this.con = cog;
    this.autoAS.show().subscribe((res: any) => {
      if (res.result) {
        this.toastService.show(`结果：${JSON.stringify(res.result)}`);
      }
      console.log('prompt from component', res);
    });
    return false;
  }

  ngOnDestroy() {
    this.srv.destroyAll();
  }

}
