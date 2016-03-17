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

  function createEl(el, classnames){
    var node=document.createElement(el);

    var joinWord = function(sentence, word) { return sentence + ' ' + word;}
    var reduce = function(callback, initialValue, array) {
      var working = initialValue;
       for (var i = 0; i < array.length; i = i + 1) {
            working = callback(working, array[i]);
        }
       return working;
    };

    typeof classnames==='string' ? node.className += classnames : 
    typeof classnames==='object' ? node.className += reduce(joinWord, '', classnames): '';
      
    return node;
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
        itemNodeName: 'li',
        listClass: 'dd-list',
        itemClass: 'dd-item',
        dragClass: 'dd-dragel',
        handleClass: 'dd-handle',
      };
      var divDrag=$(createEl('div', [items.handleClass, 'dd3-handle'])),
          divTxt=$(createEl('div', 'dd3-content')),
          divHide=$(createEl('div', ['answer', 'insidefiled', 'single']));

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
        this.el.find('.dd3-content').map(function(i, val){
          addEvent(val, 'click', _this.bildingOToggleWin, this);
        })
      }
    },
    creatItemListener:function(addbtn){
      var _this=this, active=$(addbtn);

      var _li=createEl(items.itemNodeName, items.itemClass);

      switch (addbtn){
        case items.addGroupbtn.hashtag():
          addEvent(active[0], 'click', _this.groupCreat, _this.bildingSelected);
          break;
        case items.addSingleline.hashtag():
          addEvent(active[0], 'click', _this.singInputCreat, _this);
          break;
        case items.addMultline.hashtag():
          addEvent(active[0], 'click', _this.multInputCreat, _this);
          break;
        case items.addRadiobox.hashtag():
          addEvent(active[0], 'click', _this.radioBoxCreat, _this);
          break;
        case items.addCheckbox.hashtag():
          addEvent(active[0], 'click', _this.checkBoxCreat, _this);
          break;
        case items.addmultRadio.hashtag():
          addEvent(active[0], 'click', _this.multradioBoxCreat, _this);
          break;
      }
      
    },
    groupCreat:function(active){
      var _this=this, section=$('<section class="group" />') ;
      var wrapper=_this.wrap === undefined ? $(items.listClass.dot()).first() : _this.wrap;
      section.append($('<h1 class="dd-handle" />').text('題組'));
      addEvent(section[0], 'click', active, section[0]);      
      section.append($('<div id="root" class="dd formfields"/>').append($('<ol class="'+items.listClass+'"/>')));
      wrapper.append($('<li class="'+items.listClass+'"/>').append(section));
    },
    singInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('單欄位輸入')));
        _li.append(divHide.clone()
          .append($('<textarea rows="1" placeholder="請輸入你的內容..."/>')
          .addClass('formtextInput singleinput ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find('.dd3-content')[0],'click', active.bildingOToggleWin, _li.find('.dd3-content')[0]);

      }else alert('請先建立/選擇群組在新增內容!!');      
    },
    multInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('多欄位輸入')));
        _li.append(divHide.clone()
          .append($('<textarea rows="4" placeholder="請輸入你的內容..."/>')
          .addClass('formtextInput singleinput ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find('.dd3-content')[0],'click', active.bildingOToggleWin, _li.find('.dd3-content')[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
      
      
    },
    radioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('單選題型')));
        _li.append(divHide.clone()
          .append($('<textarea rows="1" placeholder="請輸入你的內容..."/>')
          .addClass('answer insidefiled ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find('.dd3-content')[0],'click', active.bildingOToggleWin, _li.find('.dd3-content')[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
      
      
    },
    checkBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="4"/>')
          .addClass('formtextInput singleline').val('多選題型')));
        _li.append(divHide.clone()
          .append($('<textarea rows="1" placeholder="請輸入你的內容..."/>')
          .addClass('answer insidefiled')));
        _li.appendTo($(rootNode));
        addEvent( _li.find('.dd3-content')[0],'click', active.bildingOToggleWin, _li.find('.dd3-content')[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
      
    },
    multradioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('李斯特量表')));
        _li.append(divHide.clone());
        _li.appendTo($(rootNode));
        addEvent( _li.find('.dd3-content')[0],'click', active.bildingOToggleWin, _li.find('.dd3-content')[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
      
    },
    bildingSelected:function(e){
      var _this=e;
      $('.group').removeClass('active');
      $(_this).addClass('active');
    },
    findParentExites: function(){
      return  document.getElementsByClassName('active')[0] === undefined ? false : 
                document.getElementsByClassName('active')[0].getElementsByClassName('dd-list') ? document.getElementsByClassName('active')[0].getElementsByClassName('dd-list') : false;
     
    },
    bildingOToggleWin: function(target){
      classie.toggle(target.nextElementSibling, 'detail-showout');
    }
  }


  $(function(){
    $('.formfields').nestable();
    var quiz=new quizsBox('#root');

  })
}(window, document)
