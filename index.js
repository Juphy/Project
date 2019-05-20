const data = [
  {
    id: 3,
    pid: 0,
    name: "user_list",
    display_name: "用户列表",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 4,
    pid: 3,
    name: "add_user",
    display_name: "重置密码",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 5,
    pid: 3,
    name: "activate_member",
    display_name: "激活会员",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 6,
    pid: 3,
    name: "reset_password",
    display_name: "重置密码",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 7,
    pid: 3,
    name: "delete_user",
    display_name: "删除用户",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 8,
    pid: 3,
    name: "change_user_status",
    display_name: "禁用、恢复用户",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 9,
    pid: 3,
    name: "change_balance",
    display_name: "修改余额",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 10,
    pid: 3,
    name: "change_mutual_gold",
    display_name: "修改互助金",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 11,
    pid: 3,
    name: "user_parent_list",
    display_name: "用户上级",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 12,
    pid: 3,
    name: "user_child_list",
    display_name: "用户下级",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 13,
    pid: 0,
    name: "cash_list",
    display_name: "审核记录",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 14,
    pid: 13,
    name: "check_cash",
    display_name: "审核提现记录",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 15,
    pid: 0,
    name: "manager_list",
    display_name: "会员列表",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 16,
    pid: 13,
    name: "add_manager",
    display_name: "添加编辑会员",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 17,
    pid: 13,
    name: "delete_manager",
    display_name: "删除会员",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 18,
    pid: 0,
    name: "pay_list",
    display_name: "充值记录",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 19,
    pid: 0,
    name: "news_manager",
    display_name: "文章管理",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 20,
    pid: 0,
    name: "roles_manager",
    display_name: "角色管理",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 21,
    pid: 0,
    name: "batch_mutual_gold_list",
    display_name: "批量操作互助金记录",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 22,
    pid: 21,
    name: "batch_mutual_gold",
    display_name: "批量操作互助金",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 23,
    pid: 0,
    name: "system_setting",
    display_name: "系统设置",
    description: "1",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 24,
    pid: 23,
    name: "change_sum_user",
    display_name: "修改用户总数",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 25,
    pid: 23,
    name: "mutual_range",
    display_name: "互助范围",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 26,
    pid: 23,
    name: "convention_rules",
    display_name: "公约细则",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 27,
    pid: 23,
    name: "company_introducte",
    display_name: "公司简介",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  },
  {
    id: 28,
    pid: 23,
    name: "carousel_map",
    display_name: "轮播图",
    description: "2",
    created_at: "2019-05-16 20:41:06",
    updated_at: "2019-05-16 20:41:06"
  }
];

let menus = [];

data.forEach(item => {
  if (item.pid === 0) {
    let obj = {};
    obj[item["name"]] = item["display_name"];
    if (item.id === 23) {
      obj["children"] = [];
      data.forEach(_item => {
        if (item.id === _item.pid) {
          let o = {};
          o[_item["name"]] = _item["display_name"];
          obj["children"].push(o);
        }
      });
      console.log(obj['children']);
    } else {
      let fn = {};
      data.forEach(_item => {
        if (item.id === _item.pid) {
          fn[_item.name] = _item["display_name"];
        }
      });
      obj["function"] = fn;
    }
    menus.push(obj);
  }
});
console.log(menus);
