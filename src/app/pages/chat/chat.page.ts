import { Component, Injector, Input, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base.page';
import { FormControl } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { PusherService } from 'src/app/services/pusher/pusher.service';
interface Message {
  id: number;
  from_id:number;
  user: string;
  type: string;
  created_at: string;
  message: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage extends BasePage {

  message = '';
  chats: any = [];
  driver_id:any;
  backRoute:any  = 'inbox';
  messages: Array<Message>;
  isTyping: boolean = false;
  typingTimeout:any;
  auth_id:number;
  messenger_id:any
  to_user:any;
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('content') private content: any;
  user:any;
  constructor(private pusherService: PusherService,injector: Injector) {
    super(injector)
    this.ngForm = this.formBuilder.group({
      'message' : new FormControl()
    });
    this.user = this.cache.get('user_info') || '';
    if(this.user && this.user.length){
      this.user = JSON.parse(this.user);
    }
  }
  override ngOnInit(): void {
    // New message
    this.pusherService.messagesChannel.bind('client-new-message', (message:any) => {
      if (message.from_id == this.messenger_id && message.to_id == this.auth_id) {
        this.messages.push(message);
        let that = this;
        setTimeout(()=>{that.content.scrollToBottom(0);},100); 
      }
    });
    // Client Typing
    this.pusherService.messagesChannel.bind('client-typing', (data:any) => {
      if (data.from_id == this.messenger_id && data.to_id == this.auth_id) {
        this.isTyping = data.typing;
      }
    });

    this.pusherService.messagesChannel.bind('client-delete-message', (message:any) => {
      if (message.from_id == this.messenger_id && message.to_id == this.auth_id) {
        let filterdResult = this.messages.filter(function (e:any) {
          return e.id != message.id;
      });
      this.messages = filterdResult;
      }
    });
  }

  onTyping(ev:any){
    if(ev.key == 'Enter'){
      this.onSend();
      return
    }
    if (!this.isTyping) {
      // Trigger typing
      let triggered = this.isTypingFunc(true);
      // triggered
      //   ? console.info("[+] Triggered")
      //   : console.error("[+] Not triggered");
      // // Typing now
      // this.isTyping = true;
    }
    // Clear typing timeout
    clearTimeout(this.typingTimeout);
    // Typing timeout
    this.typingTimeout = setTimeout( () => {
      let triggered = this.isTypingFunc(false);
      // triggered
      //   ? console.info("[-] Triggered")
      //   : console.error("[-] Not triggered");
      // // Clear typing now
      // this.isTyping = false;
    }, 1000);
  }
  isTypingFunc(status:any) {
    return this.pusherService.messagesChannel.trigger("client-typing", {
      from_id: this.auth_id, // Me
      to_id: this.messenger_id,//getMessengerId(), // Messenger
      typing: status,
    });
  }
  override async ionViewWillEnter() {
    this.messenger_id = Number(this.cache.get('messenger_id'));
    let userIfo = this.cache.get('user_info') || ''
    let data = JSON.parse(userIfo);
    this.auth_id = data.id;
    if (history.state.data) {
      let data = history.state.data;
      this.driver_id = data.driver_id;
      this.backRoute = data.backRoute;
      this.to_user = data.to_user;
    }
    await this.loadChat();
  }

  async onSend() {
    const chat = this.ngForm.value;
    if(chat.message && chat.message){
      chat.from_id = this.auth_id;
      chat.to_id = this.driver_id;
      chat.type = 'driver';
      const response = this.apiHelperService.sendMessage(chat);
      this.ngForm.setValue({'message': ''})
      // this.messages =  await this.loadChat();
  
  
  
      const message: Message = chat
      // if(this.driver_id === this.auth_id){
        this.pusherService.messagesChannel.trigger('client-new-message', message);
      // }
      this.messages.push(message);
      let that = this;
      setTimeout(()=>{that.content.scrollToBottom(0);},100); 
    }
    
  }

  async loadChat(showloader: boolean = true){
    const data = {
      id: this.driver_id
    }
    if(showloader)
      this.loadingService.present();
    let response:any  = await this.apiHelperService.fetchMessages(data);
    
    if(response){
      this.messages = response.messages;
      let seenResp:any  = await this.apiHelperService.makeSeen(data);
      if(showloader)
        this.loadingService.dismiss();
      if(seenResp && seenResp.status){
        console.log('msg seen');
      }
      console.log('ionViewDidLoad PersonalChatPage');
      let that = this;
      setTimeout(()=>{that.content.scrollToBottom(0);},100); 
    }
  }

  override goBack(): void {
    this.router.navigateByUrl(this.backRoute);
  }

  async onDelete(message:any){
    this.loadingService.present();
    const data = {'id': message.id}
    let response:any  = await this.apiHelperService.deleteMessage(data);
    this.loadingService.dismiss();
    if(response && response.status){
    let filterdResult = this.messages.filter(function (e:any) {
      return e.id != message.id;
    });
    this.messages = filterdResult;
      this.pusherService.messagesChannel.trigger('client-delete-message', message);
    }
  }

  async getInfo(data:any){

  }
}
