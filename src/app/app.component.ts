import { Component, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  particles: any;
  particleSystem: any;
  constructor(private el: ElementRef) {
    let mouseX = 0, mouseY = 0,

    camera, scene, renderer;

    let particlePaths;
    let container;
    let maxx;
    let maxy;

    let onWindowResize = () => {

      maxx = container.offsetWidth;
      container.style.height = container.offsetWidth * 9/16 + 'px';

      maxy = container.offsetHeight;

      camera.aspect = maxx / maxy;
      camera.updateProjectionMatrix();

      renderer.setSize( maxx, maxy );
    };

    let onDocumentMouseMove = (event) => {
      mouseX = event.clientX - (maxx / 2);
      mouseY = event.clientY - (maxy / 2);
    };

    let onDocumentTouchStart = ( event ) => {
      if ( event.touches.length > 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - (maxx/2);
        mouseY = event.touches[ 0 ].pageY - (maxy/2);
      }
    };

    let onDocumentTouchMove = ( event ) => {
      if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - (maxx/2);
        mouseY = event.touches[ 0 ].pageY - (maxy/2);
      }
    };

    let render = () => {
      if (mouseX === 0) {
        camera.position.x = maxx / 7.5;
      } else {
        camera.position.x += ( mouseX - camera.position.x ) * .05;
      }
      camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
    };

    let init = () => {
      container = el.nativeElement;
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.z = 100;

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );

      maxx = container.offsetWidth;
      container.style.height = container.offsetWidth * 9/16 + 'px';
      maxy = container.offsetHeight;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize( container.offsetWidth, container.offsetHeight );
      container.appendChild( renderer.domElement );

      this.particles = new THREE.Geometry;
      particlePaths = [];

      for ( let i = 0; i < 200; i ++ ) {
        let particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
        this.particles.vertices.push(particle);
      }

      let particleMaterial = new THREE.PointsMaterial({ color: 'cyan', size: 5 });
      this.particleSystem = new THREE.Points(this.particles, particleMaterial);

      scene.add(this.particleSystem);

      let line = new THREE.Line( this.particles, new THREE.LineBasicMaterial( { color: 'cyan', opacity: 1 } ) );
      scene.add( line );

      window.addEventListener( 'resize', onWindowResize, false );

      container.addEventListener( 'mousemove', onDocumentMouseMove, false );
      container.addEventListener( 'touchstart', onDocumentTouchStart, false );
      container.addEventListener( 'touchmove', onDocumentTouchMove, false );
    };


/*   function renderX(i, myparticle) {
     if (Math.random() > 0.5) {
       myparticle.x = myparticle.x + (Math.random() * 10);
     } else {
       myparticle.x = myparticle.x - (Math.random() * 10);
     }
    }

    function renderY(i, myparticle) {
     if (Math.random() > 0.5) {
       myparticle.y = myparticle.y + (Math.random() * 10);
     } else {
       myparticle.y = myparticle.y - (Math.random() * 10);
     }
    } */

    let animate = () => {
      requestAnimationFrame( animate );
/*      for (let i = 0; i < this.particles.vertices.length; i++) {
        let myparticle = this.particles.vertices[i];

        if (Math.random() > 0.995) {
          let count = 0;
          while (count < 100) {
            renderX(i, myparticle);
            renderY(i, myparticle);
            this.particleSystem.geometry.verticesNeedUpdate = true;
            render();
            count++;
          }
        }
      }*/
      render();
    };

    init();
    animate();
  }
}
