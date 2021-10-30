import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Launch } from 'src/app/models/launch.model';
import { Apod } from 'src/app/models/apod.model';
import { SpaceXService } from 'src/app/services/spacex.service';
import { ApodService } from '../../services/apod.service'

//TODO: seccion de explorar espacio (vertical)
@Component({
    selector: 'index-page',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    launches: Array<Launch>;
    gallery: Array<Apod>;
    launch: Launch;

    constructor(private _spaceXService: SpaceXService, private router: Router, private _apodService: ApodService) {
        this.launches = new Array<Launch>();
        this.gallery = new Array<Apod>();
    }

    ngOnInit() {
        this._spaceXService.getLatestLaunches()
            .subscribe((res: Launch) => this.launch = res)
        this._spaceXService.getUpcomingLaunches()
            .subscribe((res: Array<Launch>) => this.launches.push(...res))
        this._apodService.getApods('2021-10-18', '2021-10-25')
            .subscribe((res: Array<Apod>) =>  this.gallery.push(...res) );
    }
    
    btnClick(url: string){
        this.router.navigateByUrl(url)
    }

    formatDate() {
        const dateObj = new Date(this.launch.date_unix * 1000);
        if(this.launch.tbd == true){
            return 'Indefinida'
        }
        let str = `${dateObj.getFullYear()}`
        if(this.launch.date_precision == 'hour'){
            str = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${str} ${dateObj.getHours()}:00`;
        }
        else if (this.launch.date_precision == 'day'){
            str = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${str}`;
        }
        else if (this.launch.date_precision == 'month'){
            str = `${dateObj.getMonth() + 1}/${str}`;
        }
        else if (this.launch.date_precision == 'year'){
            str = str;
        }
        else if (this.launch.date_precision == 'quarter'){
            str = `${Math.floor((dateObj.getMonth() + 1) / 4)}° Cuarto de ${str}`;
        }
        else if (this.launch.date_precision == 'half'){
            str = `${Math.floor((dateObj.getMonth() + 1) / 2)}° Mitad de ${str}`;
        }
        return str;
    }
}
 