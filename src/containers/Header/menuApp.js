export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.user', menus: [
            {
                name: 'menu.admin.crud-user', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            { //Quản lý người dùng
                name: 'menu.doctor.manage-schedule',
                subMenus: [
                    {
                        name: 'menu.doctor.schedule-doctor', link: '/doctor/schedule-doctor'
                    }
                ]
            },
        ]
    },

    { //Quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },

    { //Quản lý chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },

    { //Quản lý cẩm nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },


];

export const doctorMenu = [

    { //Quản lý lịch khám 
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.schedule-doctor', link: '/doctor/schedule-doctor'
            },

        ]
    },
    {
        name: 'menu.doctor.manage-patient',
        menus: [
            {
                name: 'menu.doctor.patient-doctor', link: '/doctor/patient-doctor'
            },
        ]
    },

];