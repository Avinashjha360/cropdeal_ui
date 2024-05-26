import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { AuthService } from '../../../Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-accounts-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'accounts-info.html',
    styleUrl: './accounts-info.component.css'
})
export class AccountsInfoComponent implements OnInit {
    user = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        enabled: true,
        role: "string"
    };
    constructor(private userService: UserService, private authService: AuthService) { }
    ngOnInit(): void {
        const userId = this.authService.getUserId();
        this.userService.getUserById(userId).subscribe((res: any) => {
            console.log(res.data);
            this.user = res.data;

        })
    }

}
