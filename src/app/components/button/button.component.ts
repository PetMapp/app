import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  constructor(private camera: CameraService,
    private router: Router
  ) { }

  ngOnInit() { }

  async photo() {
    try {
      var permit = await this.camera.permission(); 
      if (permit) {

        var image = await this.camera.GetCamera();
        console.log({image});
        await this.router.navigate(["pet/register"], {
          state: {
            imageBase64: image
          }
        })
      }

    } catch (error) {

    }
  }

}
