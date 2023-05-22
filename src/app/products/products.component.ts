import { Component, ContentChild, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { books } from '../Models/books';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../Services/cart.service';
import { ImageService } from '../Services/image.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy{

  constructor(private db: DBService,private modalService: NgbModal,private cartService: CartService,private imageService: ImageService){}

  available?: any;
  unvailable?: any;
  

  ngOnInit(): void {
    //http get request
    // this.db.getBooks().subscribe(v=>{
    //   this.books = v;
    //   this.books.forEach((a:any)=>{
    //     Object.assign(a,{quantity:1,total:a.price});
    //   })
    // })
    this.books = [
      {id: 1,name:'The Subtle Art of Not Giving a F*ck', auth:'Mark Manson', price:26.99, qty:'9',},
      {id: 2,name:'Everything is F*cked', auth:'Mark Manson', price:18.99, qty:'0'},
      {id: 3,name:'In Cold Blood', auth:'Truman Capote', price:17.99, qty:'4'},
      {id: 4,name:'The Cold Millions', auth:'Jess Walters', price:18.99, qty:'0'},
      {id: 5,name:'One Good Deed', auth:'David Baldacci', price:17.99, qty:'0'},
      {id: 6,name:'C++ Software Design', auth:'Klaus Iglberger', price:52.99, qty:'4'},
      {id: 7,name:'Calculus 12th Edition', auth:'Ron Larson', price:26.99, qty:'9'},
      {id: 8,name:'Learn Java 17', auth:'Nick Samoylov', price:39.99, qty:'3'},
      {id: 9,name: 'Python for Data Analysis', auth: 'Wes McKinney', price: 36.99, qty: '7'}
    ]
    this.books.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.price})
    })
  }

  //Modal pop up functionality///////////////////////////
  @ContentChild('content') content?: ElementRef;
  openLg(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}
  @ContentChild('longContent') longContent?: ElementRef
  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
  ////////////////////////////////////////////////////


  //Products display functionality///////////////////
  // books = new Array<any>();
  // books = [
  //   {id: 1,name:'The Subtle Art of Not Giving a F*ck', auth:'Mark Manson', price:26.99, qty:'9',},
  //   {id: 2,name:'Everything is F*cked', auth:'Mark Manson', price:18.99, qty:'0'},
  //   {id: 3,name:'In Cold Blood', auth:'Truman Capote', price:17.99, qty:'4'},
  //   {id: 4,name:'The Cold Millions', auth:'Jess Walters', price:18.99, qty:'0'},
  //   {id: 5,name:'One Good Deed', auth:'David Baldacci', price:17.99, qty:'0'},
  //   {id: 6,name:'C++ Software Design', auth:'Klaus Iglberger', price:52.99, qty:'4'},
  //   {id: 7,name:'Calculus 12th Edition', auth:'Ron Larson', price:26.99, qty:'9'},
  //   {id: 8,name:'Learn Java 17', auth:'Nick Samoylov', price:39.99, qty:'3'},
  //   {id: 9,name: 'Python for Data Analysis', auth: 'Wes McKinney', price: 36.99, qty: '7'}
  // ]
  books = new Array<any>();
  
  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }

  
  ///////////////////////////////////////////////



  //Radio filter functionality///////////////////
  returnAllProd(){
    return this.books.length;
  }
  returnAvailProd(){
    return this.books.filter(book => book.qty != '0').length;
  }
  returnUnavailProd(){
    
    return this.books.filter(book => book.qty === '0').length;
    
    
  }
  
  productsCountRadioButton: string = 'All';
  onFilterRadioButtonChanged(data: string){
    this.productsCountRadioButton = data;
  }

  returnAvail(book: any){
    if (book.qty === '0')
    {
      return 'UnAvailable';
    }
    else{return 'Available'}
  }
  ////////////////////////////////////////////////////


  //Search functionality//////////////////////////////
  searchText: string = '';
  onSearchTextEntered(data: string){
    this.searchText = data;
  }
  ////////////////////////////////////////////////////


  //Cart Functionality///////////////////////////////
  addToCart(item: any){
    this.cartService.addToCart(item);
  }
  ///////////////////////////////////////////////////


  ngOnDestroy(): void {
    
  }
}

  

