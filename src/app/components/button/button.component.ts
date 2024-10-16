import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';
import { Camera } from 'lucide-angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  cameraIcon = Camera; 

  constructor(private camera: CameraService,
    private router: Router
  ) { }

  ngOnInit() { }

  async photo() {
    try {
      var permit = await this.camera.permission();
      if (permit) {

        var image = await this.camera.GetCamera();
        if (image?.base64String != undefined) {

          await this.router.navigate(["pets/register"], {
            state: {
              imageBase64: image
            }
          })
        }
      }

    } catch (error) {

    }
  }

}
