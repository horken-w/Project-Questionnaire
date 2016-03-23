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
        exportDate: 'submit',
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
        contentClass: 'dd3-content',
        deletebtn: 'icon-del',
        createbtn: 'icon-add'
      };
      var divDrag=$(createEl('div', [items.handleClass, 'dd3-handle'])),
          divTxt=$(createEl('div', 'dd3-content')),
          divHide=$(createEl('div', ['answer', 'insidefiled'])),
          iconRemove=$(createEl('div', 'icon-btn')).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('delete')),
          sentseq={};

  quizsBox.prototype={
    init: function(){
      var _this=this, id=$('[id]');

      id.map(function(i, val){
        _this.creatItemListener(val.id.hashtag());
      });
      this.w.find($('input[name="quiztype"]')).on('click', function(e){
        if(this.value === 'person'){
          $('.tablehide').removeClass('tablehide');
          $('.denysele').removeClass('denysele');
        }else{          
          $('.table').addClass('tablehide').delay(1000).queue(function(){
            $('.boxsize').addClass('denysele').dequeue();
          });
        }        
      });

      if(this.el.find(items.addGroupbtn.dot()).length > 0){
        this.el.find(items.addGroupbtn.dot()).first().addClass('active');
        this.el.find(items.addGroupbtn.dot()).map(function(i, val){
          addEvent(val, 'click', _this.bildingSelected, this);
        })
        if(this.el.find(items.itemClass.dot()).length>0){
          this.el.find(items.deletebtn.dot()).map(function(i, val){
            addEvent(val, 'click', _this.removeItem, this.parentElement);
          })
          this.el.find(items.createbtn.dot()).map(function(i, val){
            addEvent(val, 'click', _this.subTextareaCreate, this.parentElement.parentElement);
          })
          this.el.find(items.contentClass.dot()).map(function(i, val){
            addEvent(val, 'click', _this.bildingOToggleWin, this);
          })
        }
      }
      $('a').on('click', function(e){ //remove heperlink function
        e.preventDefault();
      })

    },
    creatItemListener:function(addbtn){
      var _this=this, active=$(addbtn)[0];
      var _li=createEl(items.itemNodeName, items.itemClass);

      switch (addbtn){
        case items.addGroupbtn.hashtag():
          addEvent(active, 'click', _this.groupCreat, _this.bildingSelected);
          break;
        case items.addSingleline.hashtag():
          addEvent(active, 'click', _this.singInputCreat, _this);
          break;
        case items.addMultline.hashtag():
          addEvent(active, 'click', _this.multInputCreat, _this);
          break;
        case items.addRadiobox.hashtag():
          addEvent(active, 'click', _this.radioBoxCreat, _this);
          break;
        case items.addCheckbox.hashtag():
          addEvent(active, 'click', _this.checkBoxCreat, _this);
          break;
        case items.addmultRadio.hashtag():
          addEvent(active, 'click', _this.multradioBoxCreat, _this);
          break;
        case items.exportDate.hashtag():
          addEvent(active, 'click', _this.exportData, _this);
          break;
      }
      
    },
    groupCreat:function(active){
      var _this=this, section=$('<section class="group" />') ;
      var wrapper=_this.wrap === undefined ? $(items.listClass.dot()).first() : _this.wrap;
      section.append($('<h1 class="dd-handle" />').append($('<input/>',{
        class: 'formtextInput titletextarea',
        row: 1,
        value: '題組名稱'
      })));
      addEvent(section[0], 'click', active, section[0]);      
      section.append($('<div id="root" class="dd formfields"/>').append($('<ol class="'+items.listClass+'"/>')));
      wrapper.append($('<li class="'+items.itemClass+'"/>').append(section));
    },
    singInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('單欄位輸入')));
        _li.append(divHide.clone().addClass('single')
          .append($('<textarea rows="1" placeholder="請輸入你的內容..."/>')
          .addClass('formtextInput singleinput ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!');   

    },
    multInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('多欄位輸入')));
        _li.append(divHide.clone()
          .append($('<textarea rows="4" placeholder="請輸入你的內容..."/>')
          .addClass('formtextInput singleinput ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
    },
    radioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('單選題型')));
        _li.append(divHide.clone());
        _li.find('.answer').append(active.subTextareaCreate(_li.find('.answer')[0], active));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
    },
    checkBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="4"/>')
          .addClass('formtextInput singleline').val('多選題型')));
        _li.append(divHide.clone());
        _li.find('.answer').append(active.subTextareaCreate(_li.find('.answer')[0], active));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
      
    },
    multradioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('李克特量表')));
        _li.append(divHide.clone());
        _li.find('.answer').append(active.subTextareaCreate(_li.find('.answer')[0], active));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
    },
    subTextareaCreate: function(target ,active){
      var nodes=$('<div class="answerwrap"/>'),
          addCreate=$(createEl('div', ['icon-add', 'answer-add'])).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('create')),
          delCreate=$(createEl('div', ['icon-del', 'answer-del'])).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('delete'));
      var quiz=new quizsBox();

      if (active === undefined){
        addEvent(addCreate[0], 'click', quiz.subTextareaCreate, target);
        addEvent(delCreate[0], 'click', quiz.removeItem, target.lastChild);
        nodes.append(delCreate);
        nodes.append(addCreate);
        nodes.append($('<label/>', {
          class: 'text answer-title',
          for: 'answer',
          text: '選項: '
        }))
        nodes.append($('<input/>', {
          class: 'select answer-input',
          type: 'text',
          placeholder: '請輸入你的選項... '
        })).appendTo(target);
      }else{
        addEvent(addCreate[0], 'click', active.subTextareaCreate, target);
        addEvent(delCreate[0], 'click', active.removeItem, target.children);
        nodes.append(delCreate);
        nodes.append(addCreate);
        nodes.append($('<label/>', {
          class: 'text answer-title',
          for: 'answer',
          text: '選項: '
        }))
        nodes.append($('<input/>', {
          class: 'select answer-input',
          type: 'text',
          placeholder: '請輸入你的選項... '
        }))
        return nodes;
      };
    },
    bildingSelected:function(e){ //select group
      var _this=e;
      $(items.addGroupbtn.dot()).removeClass('active');
      $(_this).addClass('active');
    },
    findParentExites: function(){
      return  document.getElementsByClassName('active')[0] === undefined ? false : 
                document.getElementsByClassName('active')[0].getElementsByClassName('dd-list') ? document.getElementsByClassName('active')[0].getElementsByClassName('dd-list') : false;
     
    },
    showPersonalDatal: function(){

    },
    bildingOToggleWin: function(target){ //content open/close
      classie.toggle(target.nextElementSibling, 'detail-showout');
    },
    removeItem: function(item){
      var e = typeof item[0] ==='object' ? e=item[0] : e=item;

      e.parentElement.children.length-1 > 0 ? item.remove(): 
        alert('題目無法全部刪除!');
    },
    serialize: function(){
      var quizstype=['group_title', 'group_seq', 'is_base_info', 'questions'], 
          group=[ 'description', 'type', 'attribute', 'sequence', 'required', 'answers'], 
          formpaper=document.getElementsByTagName('form')[0];
      // var arrToObj= function(ind, el, array){
      //   array.reduce(function(val, i) {
      //     sentseq[ind][i] = el.data(i); //a, b, c
      //     return sentseq[ind];
      //   }, {});
      // }
      var objToArr= function(el, array, section){
        var obj={};
        if(!section){
          array.reduce(function(val, i) {
            if (el.data(i)!==undefined) 
              obj[i] = el.data(i); 
            else 
              obj[i] = [];
            return obj;
          }, {});
        }else{
          array.reduce(function(val, i) {
            if (el.data(i)!==undefined) 
              obj[i] = el.data(i); 
            else 
              obj[i] = [];
            return obj;
          }, {});
          obj.group_title=$(el).find('h1>input').val();
        }        
        return obj;
      };
      var setAnswer=function(el){
        var answer;
        $(el).find('input').each(function(i, val){
          answer=val.value;
        })
        console.log(answer);
        return answer;
      }
      var setQuestion=function(el, array){
        var obj={}, arraylist=array, nodes=el.find('.dd-item');
        for(var i=0; i<nodes.length; i++){
          var node=nodes[i];
          array.reduce(function(val, inx) {
            if ($(node).data(inx)!==undefined) 
              obj[inx] = $(node).data(inx); 
            else 
              obj[inx] = [];
            return obj;
          }, {});
          obj.description=$(node).find('textarea:first')[0].value;
          obj.request=1;
          if(obj.attribute === 2 || obj.attribute === 3 || obj.attribute === 4) 
            obj.answers.push(setAnswer(node));
        }
        return obj;
      };

      sentseq['title']=formpaper[0].value;
      sentseq['description']=formpaper[1].value;
      sentseq['footer']=formpaper[2].value;
      sentseq['target']=document.querySelector('input[name="quiztype"]:checked').value;
      sentseq['groups']=[];
      sentseq['groups'].push(objToArr($('.group'), quizstype));
      $('section.group').map(function(i, val){
        sentseq['groups'].push(objToArr($(val), quizstype, true));        
        sentseq.groups[i].questions.push(setQuestion($(val), group));        
      })

      console.log(sentseq);
    },
    exportData: function(tooling){
      return tooling.serialize();
    }
  }


  $(function(){
    $('.formfields').nestable();
    var quiz=new quizsBox('#root');

  })
}(window, document)
