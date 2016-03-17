!function (window, document){
	'user strict';

	String.prototype.dot = function() {
    return '.' + this;
  };
  String.prototype.hashtag = function() {
    return '#' + this;
  };

  function addEvent(obj,evt,fn) {
    if (obj.addEventListener)
      obj.addEventListener(evt,fn,false);
    else if (obj.attachEvent)
      obj.attachEvent('on'+evt,fn);
  }

  function bildingSelected(e){ //select target group
      var _this=this;
      $('.group').removeClass('active');
      $(_this).addClass('active');
  }

  function quizsBox(element){
    this.w=$(document);
    this.el=$(element);
    this.init();
  }

  var items={
        rootEl: 'root',
        addGroupbtn: 'group',
        addSingleline: 'singleline',
        addMultline: 'textarea',
        addRadiobox: 'radiobox',
        addCheckbox: 'checkbox',
        addmultRadio: 'likertscale'
      };

  quizsBox.prototype={
    init: function(){
      var _this=this, id=$('[id]');

      id.map(function(i, val){
        _this.creatItemListener(val.id.hashtag());
      });

      if(this.el.find('.group').length !== 0){
        this.el.find('.group').first().addClass('active');
        this.el.find('.group').map(function(i, val){
          addEvent(val, 'click', bildingSelected);
        })
      }
      
      
      
    },
    creatItemListener:function(addbtn){
      var _this=this, active=$(addbtn);
      switch (addbtn){
        case items.addGroupbtn.hashtag():
          addEvent(active[0], 'click', _this.groupCreat);
          break;
        case items.addSingleline.hashtag():
          addEvent(active[0], 'click', _this.singInputCreat);
          break;
        case items.addMultline.hashtag():
          addEvent(active[0], 'click', _this.multInputCreat);
          break;
        case items.addRadiobox.hashtag():
          addEvent(active[0], 'click', _this.radioBoxCreat);
          break;
        case items.addCheckbox.hashtag():
          addEvent(active[0], 'click', _this.checkBoxCreat);
          break;
        case items.addmultRadio.hashtag():
          addEvent(active[0], 'click', _this.multradioBoxCreat);
          break;
      }
      
    },
    groupCreat:function(){
      var _this=this, section=$('<section class="group" />') ;
      var wrapper=_this.wrap === undefined ? $(items.rootEl.hashtag()) : _this.wrap;
      section.append($('<h1 class="dd-handle" />').text('題組'));
      addEvent(section[0], 'click', bildingSelected);
      wrapper.append(section);
    },
    singInputCreat:function(active){
      var _this=this;
      
      console.log(1);
    },
    multInputCreat:function(active){
      var _this=this;
      var wrapper=_this.wrap === undefined ? $(items.rootEl.hashtag()) : _this.wrap;
      console.log(1);
    },
    radioBoxCreat:function(active){
      var _this=this;
      var wrapper=_this.wrap === undefined ? $(items.rootEl.hashtag()) : _this.wrap;
      console.log(1);
    },
    checkBoxCreat:function(active){
      var _this=this;
      var wrapper=_this.wrap === undefined ? $(items.rootEl.hashtag()) : _this.wrap;
      console.log(1);
    },
    multradioBoxCreat:function(active){
      var _this=this;
      var wrapper=_this.wrap === undefined ? $(items.rootEl.hashtag()) : _this.wrap;
      console.log(1);
    },
    
  }


  $(function(){
    $('.formfields').nestable();
    var quiz=new quizsBox('#root');

  })
}(window, document)
