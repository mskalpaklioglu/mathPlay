import { Component } from '@angular/core';
import {FormGroup,FormControl, AbstractControl} from '@angular/forms';
import {EqualityValidators} from '../equality-validators'
import { delay, filter , scan } from 'rxjs';
@Component({
  selector: 'app-equality',
  templateUrl: './equality.component.html',
  styleUrls: ['./equality.component.css']
})
export class EqualityComponent {


  seconds=0;
  mathForm =new FormGroup(
    {
      firstNumber:new FormControl(this.generateNumber()),
      secondNumber:new FormControl(this.generateNumber()),
      answer:new FormControl('')
    },
    [EqualityValidators.addition('answer','firstNumber','secondNumber')]
  )

  get firstNumber()
  {
    return this.mathForm.value.firstNumber;
  }

  get secondNumber()
  {
    return this.mathForm.value.secondNumber;
  }

  constructor(){}

  ngOnInit():void{

    // const startTime=new Date();
    // let numberSolved=0;


this.mathForm.statusChanges.pipe(
  filter(value=>value === 'VALID'),
  delay(800),
  scan(acc =>{
    return{
      numberSolved:acc.numberSolved+1,
      startTime:acc.startTime
    };
  },
  {numberSolved:0, startTime:new Date()}
  )
).
subscribe(( {numberSolved, startTime})=>{

  //numberSolved++;
  this.seconds=(new Date().getTime() - startTime.getTime())/numberSolved / 1000;

  this.mathForm.setValue({
    firstNumber:this.generateNumber(),
    secondNumber:this.generateNumber(),
    answer:''
  });

})
  }


  generateNumber()
  {
    return Math.floor(Math.random()*10);
  }
}
