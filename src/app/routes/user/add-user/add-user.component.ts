import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  snum;
  @Input() data: any;
  constructor(
    private nzModalRef: NzModalRef,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.validateForm = this.fb.group({
      id_card: ["", [Validators.required]],
      name: ["", [Validators.required]],
      address: ["", [Validators.required]],
      password: [123456, [Validators.required]],
      _password: [123456, [Validators.required]],
      phone: ['',],
      parent_snum: ['']
    });
  }

  get id_card() {
    return this.validateForm.controls.id_card;
  }

  get name() {
    return this.validateForm.controls.name;
  }

  get address() {
    return this.validateForm.controls.address;
  }

  get password() {
    return this.validateForm.controls.password;
  }

  get _password() {
    return this.validateForm.controls._password;
  }

  get phone() {
    return this.validateForm.controls.phone;
  }

  get parent_snum () {
    return this.validateForm.controls.parent_snum;
  }

  ngOnInit() {
    if (this.data) {
      this.snum = this.data.snum;
      this.validateForm = this.fb.group({
        id_card: [this.data.id_card, [Validators.required]],
        name: [this.data.name, [Validators.required]],
        address: [this.data.address, [Validators.required]],
        password: [123456, [Validators.required]],
        _password: [123456, [Validators.required]],
        phone: [this.data.phone,],
      });
    }
  }


  submit_form() {
    if (this.password.value !== this._password.value) {
      this.nzMessageService.error('密码不一致！');
      return;
    }
    for (let i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    if (
      this.id_card.invalid ||
      this.name.invalid ||
      this.address.invalid ||
      this.password.invalid ||
      this._password.invalid
    )
    return;
    if (this.data) {
      this.http
        .post("api/manager/edit_user", {
          id: this.data.id,
          snum: this.snum,
          phone: this.phone.value,
          id_card: this.id_card.value,
          name: this.name.value,
          address: this.address.value
        })
        .subscribe(res => {
          this.loading = false;
          if (res["status"] === 200) {
            this.nzMessageService.success("编辑用户成功！");
            this.nzModalRef.destroy(true);
          }
        }, err => {
          this.loading = false;
        });
    } else {
      this.loading = true;
      let params = {
        id_card: this.id_card.value,
        name: this.name.value,
        address: this.address.value,
        phone: this.phone.value,
        parent_snum: this.parent_snum.value,
        password: this.password.value
      }
      this.http
        .post("api/manager/add_user", params)
        .subscribe(res => {
          this.loading = false;
          if (res["status"] === 200) {
            this.nzMessageService.success("用户添加成功！");
            this.nzModalRef.destroy(true);
          }
        }, err => {
          this.loading = false;
        });
    }
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }
}
