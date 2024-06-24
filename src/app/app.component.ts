import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-hello-world !!';
  name = 'jax'; //on définit l'état
  life = signal(100);
  mana = signal(100);
  quote = signal("Suivez mon lampadaire, à moins qu'il soit planté dans le crâne d'un ennemi ! 🎉");
  faitDodo = signal(false);
  etSiJeVousRaccontaisUneHistoire(){
    if(!this.faitDodo())
    this.quote.set("J'ai plein d'histoires à racconter ! 🔥")  ;
  }

  treveDeGalejades(){
    if(!this.faitDodo())
    this.quote.set("Bon ! il est temps d'aller purger Icatia de tous ces brigands ! 💀 ")  ;
  }

  reinitialiserSitation(){
    if(!this.faitDodo())this.quote.set("Suivez mon lampadaire, à moins qu'il soit planté dans le crâne d'un ennemi ! 🎉")
  }

  vivifier(){
    if(!this.faitDodo()&&this.life()< 250)this.life.update(n => n+1);
  }

  async  dort(ms: number):Promise<void>{
    return new Promise(res =>setTimeout(res, ms))
  }
  async energieRestante(){
    if(this.faitDodo()) return;
    this.mana.update(n => +(0.75*n).toPrecision(1))
    this.life.update(n => n-15);
    if(this.mana() < 25 ){
      this.quote.set("Il est temps que j'aille faire une petite siteste ! Zzz")
      this.faitDodo.set(true)
      let i = signal(1);
      while(this.mana()< 100){
        this.mana.update(n => n+1)
        if(this.life()<=247) this.life.update(n => n+3)
        await this.dort(10*i())
        this.quote.set(`Zzzz pfffffffff (+${i()} points de mana +${i()}, points de vie)`)
        i.update(n => n+1);
      }
      this.quote.set("J'ai bien dormi !") 
      this.faitDodo.set(false)
      this.mana.set(100)
    }
  }

}
