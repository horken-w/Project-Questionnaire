!function (window, document){
	'user strict';

	String.prototype.dot = function() {
    return '.' + this;
  };
  String.prototype.hashtag = function() {
    return '#' + this;
  };

  function addEvent(obj,evt,fn, arg) {
    if (obj.addEventListener)
      obj.addEventListener(evt,function(){fn(arg)},false);
    else if (obj.attachEvent)
      obj.attachEvent('on'+evt,function(){fn(arg)});
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
        addmultRadio: 'likertscale',
        listNodeName: 'ol',
        itemNodeName: 'li',
        rootClass: 'dd',
        listClass: 'dd-list',
        itemClass: 'dd-item',
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
          addEvent(val, 'click', _this.bildingSelected, this);
        })
      }
    },
    creatItemListener:function(addbtn){
      var _this=this, active=$(addbtn);
      function creatElement(el, classnames){
        var node=document.createElement(el);
        if(typeof classnames==='string') node.className+=classnames
        return node;
      }

      var _ol=creatElement(items.listNodeName, items.listClass),
          _li=creatElement(items.itemNodeName, items.itemClass);

      switch (addbtn){
        case items.addGroupbtn.hashtag():
          addEvent(active[0], 'click', _this.groupCreat, _this.bildingSelected);
          break;
        case items.addSingleline.hashtag():
          addEvent(active[0], 'click', _this.singInputCreat, 
            [_ol, _li]);
          break;
        case items.addMultline.hashtag():
          addEvent(active[0], 'click', _this.multInputCreat, [_ol, _li]);
          break;
        case items.addRadiobox.hashtag():
          addEvent(active[0], 'click', _this.radioBoxCreat, [_ol, _li]);
          break;
        case items.addCheckbox.hashtag():
          addEvent(active[0], 'click', _this.checkBoxCreat, [_ol, _li]);
          break;
        case items.addmultRadio.hashtag():
          addEvent(active[0], 'click', _this.multradioBoxCreat, [_ol, _li]);
          break;
      }
      
    },
    groupCreat:function(active){
      var _this=this, section=$('<section class="group" />') ;
      var wrapper=_this.wrap === undefined ? $(items.rootEl.hashtag()) : _this.wrap;
      section.append($('<h1 class="dd-handle" />').text('題組'));
      addEvent(section[0], 'click', active, section[0]);
      wrapper.append(section);
    },
    singInputCreat:function(active){
      var _this=document.getElementsByClassName('active');
      var _ol=active[0], _li=active[1];
      
    },
    multInputCreat:function(active){
      var _this=document.getElementsByClassName('active');
      var _ol=active[0], _li=active[1];
      
    },
    radioBoxCreat:function(active){
      var _this=document.getElementsByClassName('active');
      var _ol=active[0], _li=active[1];
      
    },
    checkBoxCreat:function(active){
      var _this=document.getElementsByClassName('active');
      var _ol=active[0], _li=active[1];
      
    },
    multradioBoxCreat:function(active){
      var _this=document.getElementsByClassName('active');
      var _ol=active[0], _li=active[1];
      
    },
    bildingSelected:function(e){
      var _this=e;
      $('.group').removeClass('active');
      $(_this).addClass('active');
    }
  }


  $(function(){
    $('.formfields').nestable();
    var quiz=new quizsBox('#root');

  })
}(window, document)
