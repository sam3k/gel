$('document').ready(function(){
  var TPL, PGS, PARTIALS, pg, theme = 'sam3k';
  
  TPL       =  'tpls/';
  PGS       =  TPL + 'pages/';
  PARTIALS  =  TPL + 'partials/';
  
  templating = {
    template : PGS + 'overview',
    partials : {
      grids       :  'grids',
      typography  :  'typography',
      layouts     :  'layouts',
      colors      :  'colors',
      headings    :  'headings',
      copy_small  :  'copy_small',
      alphabet    :  'alphabet'
    }
  }
  
  function loadPartial(name, callback) {
    $.get(PARTIALS + name + '.html', function(data){
      templating.partials[name] = data;
      callback(data);
    });
  }
  
  function getPartials(callback) {
    var count=1, totalPartials = _.size(templating.partials);
    
    for( partial in templating.partials) {
      loadPartial(partial, function(data){
        if(count == totalPartials) {
          callback();
        }
        count++;
      });
    }
  }
  
  function loadTemplate() {
    $.get(templating.template + '.html', function(data){
      var tpl = Mustache.render(data, { title:'hello' }, templating.partials);
      $('body').append(tpl);
      $('.panel').animate({opacity:1}, 800);
    });
  }
  
  getPartials(function(){
    loadTemplate();
  })
  
  
  var gel = {
    mode : function (str) {
      var className = str == 'theme' ? 't-'+theme : 'm-'+str;
      $('body').removeClass().addClass(className);
    },
    wireframe : function() {
      this.mode('wireframe');
    },
    layout : function() {
      this.mode('layout');
    },
    theme : function() {
      this.mode('theme');
    }
  }
  
  window.gel = gel;
  
});