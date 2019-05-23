import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  constructor(
    private nzModalRef: NzModalRef,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private http: HttpClient
  ) {
    this.validateForm = this.fb.group({
      id_card: ["", [Validators.required]],
      name: ["", [Validators.required]],
      birthday: [null, [Validators.required]],
      address: ["", [Validators.required]],
      password: [123456, [Validators.required]]
    });
  }

  get id_card() {
    return this.validateForm.controls.id_card;
  }

  get name() {
    return this.validateForm.controls.name;
  }

  get birthday() {
    return this.validateForm.controls.birthday;
  }

  get address() {
    return this.validateForm.controls.address;
  }

  get password() {
    return this.validateForm.controls.password;
  }

  ngOnInit() {}

  handle_birth(e) {
    if (this.birthday.value) return;
    if (e.length >= 18) {
      e = e.slice(6, 14);
      let date = e.slice(0, 4) + "-" + e.slice(4, 6) + "-" + e.slice(6, 8);
      this.birthday.setValue(new Date(date));
    }
  }

  submit_form() {
    for (let i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    if (
      this.id_card.invalid ||
      this.name.invalid ||
      this.birthday.invalid ||
      this.address.invalid ||
      this.password.invalid
    )
      return;
    this.loading = true;
    this.http
      .post("api/manager/add_user", {
        id_card: this.id_card.value,
        name: this.name.value,
        birthday: this.birthday.value,
        address: this.address.value,
        password: this.password.value
      })
      .subscribe(res => {
        console.log(res);
        this.loading = false;
        if (res["status"] === 200) {
          this.nzMessageService.success("用户添加成功！");
          this.nzModalRef.destroy(true);
        }
      });
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }
}
