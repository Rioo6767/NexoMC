(function(){
  const drawer=document.getElementById('sideNav');
  const openBtn=document.getElementById('sideNavToggle');
  const closeBtn=document.getElementById('sideNavClose');
  const backdrop=document.getElementById('sideNavBackdrop');
  if(!drawer||!openBtn)return;

  const close=()=>{
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
    openBtn.setAttribute('aria-expanded','false');
    document.body.classList.remove('side-nav-open');
  };
  const open=()=>{
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
    openBtn.setAttribute('aria-expanded','true');
    document.body.classList.add('side-nav-open');
  };

  openBtn.addEventListener('click',open);
  closeBtn&&closeBtn.addEventListener('click',close);
  backdrop&&backdrop.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});

  const groups=[...drawer.querySelectorAll('.side-nav-group')];

  // Accordion CSS-driven (grid rows) sama seperti sebelumnya — smooth di mobile.
  const setGroup=(group,isOpen)=>{
    const btn=group.querySelector('.side-nav-group-toggle');
    group.classList.toggle('open',isOpen);
    if(btn) btn.setAttribute('aria-expanded',isOpen?'true':'false');
  };

  // Selalu mulai dengan semua kategori tertutup.
  groups.forEach(group=>setGroup(group,false));

  groups.forEach(group=>{
    const btn=group.querySelector('.side-nav-group-toggle');
    if(!btn)return;
    btn.addEventListener('click',()=>{
      const shouldOpen=!group.classList.contains('open');
      // Satu kategori terbuka dalam satu waktu.
      groups.forEach(other=>{
        if(other!==group) setGroup(other,false);
      });
      setGroup(group,shouldOpen);
    });
  });

  drawer.querySelectorAll('[data-coming-soon]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    close();
  }));
})();
