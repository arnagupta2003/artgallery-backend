import{C as t,D as e,E as m,J as x,S as n,fb as E,oe as f,q as w,s as C}from"./chunk-KEHI5R4L.js";import{a as v,b as g}from"./chunk-BAF7YKD7.js";var P=(()=>{class y{constructor(a){this.dataService=a,this.selectedContent=null,this.achievementPreviews=[],this.exhibitionPreviews=[],this.mediamentionsPreviews=[]}ngOnInit(){this.loadContents(),window.enableEditing=this.enableEditing.bind(this),window.angularComponent=this,window.onFileSelected=this.onFileSelected.bind(this),window.addExhibitionRow=this.addExhibitionRow.bind(this),window.removeTableRow=this.removeTableRow.bind(this)}loadContents(){let a=E`
            query {
                contents {
                    items {
                        id
                        createdAt
                        updatedAt
                        code
                        quotation
                        homeintroduction
                        artistAchievements
                        artistPhotoHome
                        age
                        nationality
                        aboutintroductionpara1
                        aboutintroductionpara2
                        artistPhotoAbout
                        instagram
                        twitter
                        whatsapp
                        achievements {
                            award
                            venue
                            year
                            photo
                            link
                        }
                        exhibitions {
                            coverPhoto
                            title
                            venue
                            date
                            link
                        }
                        mediamentions {
                            photo
                            description
                            year
                            link
                        }
                    }
                    totalItems
                }
            }
        `;this.dataService.query(a).mapStream(o=>o.contents.items).subscribe({next:o=>{console.log(o),o.length>0&&(this.selectedContent=v({},o[0]),this.updateDOM())},error:o=>console.error("Error loading contents:",o)})}renderTables(){let a=document.querySelector("#achievements-table tbody");a.innerHTML="",this.selectedContent?.achievements?.forEach(r=>{a.innerHTML+=`
                <tr>
                    <td>${r.award}</td>
                    <td>${r.venue}</td>
                    <td>${r.year}</td>
                    <td><img src="${r.photo}" style="max-width:100px;" class="content-photo-img" /></td>
                    <td><a href="${r.link}" target="_blank">View</a></td>
                </tr>
            `});let o=document.querySelector("#exhibitions-table tbody");o.innerHTML="",this.selectedContent?.exhibitions?.forEach(r=>{o.innerHTML+=`
                <tr>
                    <td>${r.title}</td>
                    <td>${r.venue}</td>
                    <td>${r.date}</td>
                    <td><img src="${r.coverPhoto}"  style="max-width:100px;" class="content-photo-img" /></td>
                    <td><a href="${r.link}" target="_blank">View</a></td>
                </tr>
            `});let i=document.querySelector("#mediamentions-table tbody");i&&(i.innerHTML="",this.selectedContent?.mediamentions?.forEach(r=>{i.innerHTML+=`
                    <tr>
                        <td><img src="${r.photo}" style="max-width:100px;"  class="content-photo-img" /></td>
                        <td>${r.description}</td>
                        <td>${r.year}</td>
                        <td><a href="${r.link}" target="_blank">View</a></td>
                    </tr>
                `}));let d=document.getElementById("artist-achievements-container");d&&(d.innerHTML="",this.selectedContent?.artistAchievements?.forEach(r=>{let c=document.createElement("div");c.classList.add("achievement-item"),c.textContent=r,d.appendChild(c)}))}addArtistAchievementRow(){let a=document.getElementById("artist-achievements-list"),o=a.children.length,i=document.createElement("li");i.className="achievement-item";let d=document.createElement("input");d.type="text",d.className="input-field",d.id=`artistAchievement-${o}`;let r=document.createElement("button");r.type="button",r.innerText="Remove",r.className="btn-remove",r.onclick=()=>i.remove(),i.appendChild(d),i.appendChild(r),a.appendChild(i)}removeTableRow(a,o){if(this.selectedContent){if(console.log("Type:",a,"Index:",o),a==="achievement"){this.collectAchievementsFromTable(),console.log("Before Removing:",this.selectedContent.achievements);let i=[...this.selectedContent.achievements];i.splice(o,1),this.selectedContent.achievements=i,console.log("After Removing:",this.selectedContent.achievements)}else if(a==="exhibition"){this.collectExhibitionsFromTable(),console.log("Before Removing:",this.selectedContent.exhibitions);let i=[...this.selectedContent.exhibitions];i.splice(o,1),this.selectedContent.exhibitions=i,console.log(i),console.log("After Removing:",this.selectedContent.exhibitions)}else if(a==="mediamentions"){this.collectMediaMentionsFromTable(),console.log("Before Removing:",this.selectedContent.mediamentions);let i=[...this.selectedContent.mediamentions];i.splice(o,1),this.selectedContent.mediamentions=i,console.log("After Removing:",this.selectedContent.mediamentions)}this.enableEditing()}}addAchievementRow(){this.collectAchievementsFromTable();let a=document.querySelector("#edit-achievements-table tbody"),o=a.children.length;this.achievementPreviews.push("");let i=document.createElement("tr");i.id=`achieve-${o}`,i.innerHTML=`
            <td><input type="text" id="achieve-award-${o}"  /></td>
            <td><input type="text" id="achieve-venue-${o}"  /></td>
            <td><input type="number" id="achieve-year-${o}"/></td>
            <td>
                <input type="file" onchange="angularComponent.onFileSelected(event, 'achievement', ${o})"style="width: 100px; height: 100px;" /> <br>
                <img src="${this.achievementPreviews[o]}" class="preview-img content-photo-img"  />
            </td>
            <td><input type="text" id="achieve-link-${o}"  /></td>
            <td><button type="button" onclick="removeTableRow('achievement', ${o})">Remove</button></td>
        `,a.appendChild(i)}collectAchievementsFromTable(){let a=document.querySelectorAll("#edit-achievements-table tbody tr"),o=[];a.forEach((i,d)=>{let r=i.querySelector(`#achieve-award-${d}`)?.value||"",c=i.querySelector(`#achieve-venue-${d}`)?.value||"",l=parseInt(i.querySelector(`#achieve-year-${d}`)?.value)||null,s=i.querySelector(`#achieve-link-${d}`)?.value||"",u=this.achievementPreviews[d]||"";o.push({award:r,venue:c,year:l,link:s,photo:u})}),this.selectedContent&&(this.selectedContent.achievements=o)}addExhibitionRow(){this.collectExhibitionsFromTable();let a=document.querySelector("#edit-exhibitions-table tbody"),o=a.children.length;this.exhibitionPreviews.push("");let i=document.createElement("tr");i.id=`exhibit-${o}`,i.innerHTML=`
            <td><input type="text" id="exhibit-title-${o}"  /></td>
            <td><input type="text" id="exhibit-venue-${o}" /></td>
            <td><input type="text" id="exhibit-date-${o}" /></td>
            <td>
                <input type="file" onchange="angularComponent.onFileSelected(event, 'exhibition', ${o})" style="width: 100px; "/ > <br>
                <img src="${this.exhibitionPreviews[o]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;" />
            </td>
            <td><input type="text" id="exhibit-link-${o}" /></td>
            <td><button type="button" onclick="removeTableRow('exhibition', ${o})">Remove</button></td>
        `,a.appendChild(i)}collectExhibitionsFromTable(){let a=document.querySelectorAll("#edit-exhibitions-table tbody tr"),o=[];a.forEach((i,d)=>{let r=i.querySelector(`#exhibit-title-${d}`)?.value||"",c=i.querySelector(`#exhibit-venue-${d}`)?.value||"",l=i.querySelector(`#exhibit-date-${d}`)?.value||"",s=i.querySelector(`#exhibit-link-${d}`)?.value||"",u=this.exhibitionPreviews[d]||"";o.push({title:r,venue:c,date:l,link:s,coverPhoto:u})}),this.selectedContent&&(this.selectedContent.exhibitions=o)}addMediaMentionRow(){this.collectMediaMentionsFromTable();let a=document.querySelector("#edit-mediamentions-table tbody"),o=a.children.length;this.mediamentionsPreviews.push("");let i=document.createElement("tr");i.id=`mediamention-${o}`,i.innerHTML=`
            <td>
                <input type="file" onchange="angularComponent.onFileSelected(event, 'mediamentions', ${o})" style="width:100px; " /> <br>
                <img src="${this.mediamentionsPreviews[o]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;" />
            </td>
            <td><input type="text" id="mediamention-description-${o}" /></td>
            <td><input type="text" id="mediamention-year-${o}" /></td>
            <td><input type="text" id="mediamention-link-${o}"/></td>
            <td><button type="button" onclick="removeTableRow('mediamention', ${o})">Remove</button></td>
        `,a.appendChild(i)}collectMediaMentionsFromTable(){let a=document.querySelectorAll("#edit-mediamentions-table tbody tr"),o=[];a.forEach((i,d)=>{let r=i.querySelector(`#mediamention-description-${d}`)?.value||"",c=i.querySelector(`#mediamention-year-${d}`)?.value||"",l=i.querySelector(`#mediamention-link-${d}`)?.value||"",s=this.mediamentionsPreviews[d]||"";o.push({photo:s,description:r,year:c,link:l})}),console.log(o),this.selectedContent&&(this.selectedContent.mediamentions=o)}updateDOM(){if(!this.selectedContent)return;let a=this.selectedContent;document.getElementById("quotation").innerText=a.quotation||"",document.getElementById("homeintroduction").innerText=a.homeintroduction||"",document.getElementById("artistPhotoHome").src=a.artistPhotoHome||"",document.getElementById("age").innerText=a.age?.toString()||"",document.getElementById("nationality").innerText=a.nationality||"",document.getElementById("aboutintroductionpara1").innerText=a.aboutintroductionpara1||"",document.getElementById("aboutintroductionpara2").innerText=a.aboutintroductionpara2||"",document.getElementById("artistPhotoAbout").src=a.artistPhotoAbout||"",document.getElementById("instagram-view").innerText=a.instagram||"",document.getElementById("twitter-view").innerText=a.twitter||"",document.getElementById("whatsapp-view").innerText=a.whatsapp||"",this.renderTables()}enableEditing(){if(!this.selectedContent)return;let a=this.selectedContent;document.getElementById("quotation-edit").value=a.quotation??"",document.getElementById("homeintroduction-edit").value=a.homeintroduction??"",document.getElementById("aboutintroductionpara1-edit").value=a.aboutintroductionpara1??"",document.getElementById("aboutintroductionpara2-edit").value=a.aboutintroductionpara2??"",document.getElementById("instagram-edit").value=a.instagram??"",document.getElementById("twitter-edit").value=a.twitter??"",document.getElementById("whatsapp-edit").value=a.whatsapp??"",document.getElementById("age-edit").value=a.age?.toString()??"",document.getElementById("nationality-edit").value=a.nationality??"",document.getElementById("artistPhotoHome").value=a.artistPhotoHome??"",document.getElementById("artistPhotoAbout").value=a.artistPhotoAbout??"";let o=document.getElementById("artist-achievements-list");o.innerHTML="",a.artistAchievements?.forEach((c,l)=>{let s=document.createElement("li");s.className="achievement-item";let u=document.createElement("input");u.type="text",u.className="input-field",u.id=`artistAchievement-${l}`,u.value=c;let p=document.createElement("button");p.type="button",p.innerText="Remove",p.className="btn-remove",p.onclick=()=>s.remove(),s.appendChild(u),s.appendChild(p),o.appendChild(s)});let i=document.querySelector("#edit-achievements-table tbody");i.innerHTML="",this.achievementPreviews=a.achievements?.map(c=>c.photo||"")||[],a.achievements?.forEach((c,l)=>{let s=document.createElement("tr");s.id=`achieve-${l}`,s.innerHTML=` <td><input type="text" id="achieve-award-${l}" value="${c.award||""}" /></td>
                <td><input type="text" id="achieve-venue-${l}" value="${c.venue||""}" /></td>
                <td><input type="text" id="achieve-year-${l}" value="${c.year||""}" /></td>
                <td>
                    <input type="file" onchange="onFileSelected(event, 'achievement', ${l})"  style="width:120px"/> <br>
                    <img src="${this.achievementPreviews[l]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;"/>
                </td>
                <td><input type="text" id="achieve-link-${l}" value="${c.link||""}" /></td>
                <td><button type="button" onclick="removeTableRow('achievement', ${l})">Remove</button></td>
            `,i.appendChild(s)});let d=document.querySelector("#edit-exhibitions-table tbody");d.innerHTML="",this.exhibitionPreviews=a.exhibitions?.map(c=>c.coverPhoto||"")||[],a.exhibitions?.forEach((c,l)=>{let s=document.createElement("tr");s.id=`exhibit-${l}`,s.innerHTML=`
                <td><input type="text" id="exhibit-title-${l}" value="${c.title||""}" /></td>
                <td><input type="text" id="exhibit-venue-${l}" value="${c.venue||""}" /></td>
                <td><input type="text" id="exhibit-date-${l}" value="${c.date||""}" /></td>
                <td>
                    <input type="file" onchange="onFileSelected(event, 'exhibition', ${l})" style="width:120px" /> <br>
                    <img src="${this.exhibitionPreviews[l]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;" />
                </td>
                <td><input type="text" id="exhibit-link-${l}" value="${c.link||""}" /></td>
                <td><button type="button" onclick="removeTableRow('exhibition', ${l})">Remove</button></td>
            `,d.appendChild(s)});let r=document.querySelector("#edit-mediamentions-table tbody");r.innerHTML="",this.mediamentionsPreviews=a.mediamentions?.map(c=>c.photo||"")||[],a.mediamentions?.forEach((c,l)=>{let s=document.createElement("tr");s.id=`mediamention-${l}`,s.innerHTML=`
                <td>
                    <input type="file" onchange="onFileSelected(event, 'mediamentions', ${l})" style="width:120px" /> <br>
                    <img src="${this.mediamentionsPreviews[l]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;"/>
                </td>
                <td><input type="text" id="mediamention-description-${l}" value="${c.description||""}" /></td>
                <td><input type="number" id="mediamention-year-${l}" value="${c.year||""}" /></td>
                <td><input type="text" id="mediamention-link-${l}" value="${c.link||""}" /></td>
                <td><button type="button" onclick="removeTableRow('mediamentions', ${l})">Remove</button></td>
            `,r.appendChild(s)}),document.getElementById("view-mode").style.display="none",document.getElementById("edit-mode").style.display="block"}onFileSelected(a,o,i){let d=a.target;if(d.files&&d.files.length>0){let r=d.files[0],c=E`
                mutation UploadAsset($input: [CreateAssetInput!]!) {
                    createAssets(input: $input) {
                        ... on Asset {
                            id
                            source
                            preview
                        }
                        ... on ErrorResult {
                            message
                        }
                    }
                }
            `;this.dataService.mutate(c,{input:[{file:r}]}).subscribe({next:l=>{let s=l.createAssets?.[0];if(s&&"source"in s){let u=s.source;if(o==="achievement"&&typeof i=="number"){if(this.achievementPreviews[i]=s.preview||u,this.selectedContent?.achievements?.[i]){let p=[...this.selectedContent.achievements];p[i]=g(v({},p[i]),{photo:u}),this.selectedContent=g(v({},this.selectedContent),{achievements:p})}}else if(o==="exhibition"&&typeof i=="number"){if(this.exhibitionPreviews[i]=s.preview||u,this.selectedContent?.exhibitions?.[i]){let p=[...this.selectedContent.exhibitions];p[i]=g(v({},p[i]),{coverPhoto:u}),this.selectedContent=g(v({},this.selectedContent),{exhibitions:p})}}else if(o==="mediamentions"&&typeof i=="number"){if(this.mediamentionsPreviews[i]=s.preview||u,this.selectedContent?.mediamentions?.[i]){let p=[...this.selectedContent.mediamentions];p[i]=g(v({},p[i]),{photo:u}),this.selectedContent=g(v({},this.selectedContent),{mediamentions:p}),console.log(this.mediamentionsPreviews)}}else o==="artistPhotoHome"?document.getElementById("artistPhotoHome").value=u:o==="artistPhotoAbout"&&(document.getElementById("artistPhotoAbout").value=u)}},error:l=>console.error("Image upload failed:",l)})}}saveChanges(){if(!this.selectedContent)return;let a=document.getElementById("age-edit")?.value||"0",o=parseInt(a,10),i=isNaN(o)?0:o,d={id:this.selectedContent.id,code:this.selectedContent.code||"",quotation:document.getElementById("quotation-edit")?.value||"",homeintroduction:document.getElementById("homeintroduction-edit")?.value||"",aboutintroductionpara1:document.getElementById("aboutintroductionpara1-edit")?.value||"",aboutintroductionpara2:document.getElementById("aboutintroductionpara2-edit")?.value||"",age:i,nationality:document.getElementById("nationality-edit")?.value||"",instagram:document.getElementById("instagram-edit")?.value||"",twitter:document.getElementById("twitter-edit")?.value||"",whatsapp:document.getElementById("whatsapp-edit")?.value||"",artistPhotoHome:document.getElementById("artistPhotoHome")?.value||"",artistPhotoAbout:document.getElementById("artistPhotoAbout")?.value||"",artistAchievements:Array.from(document.querySelectorAll("#artist-achievements-list input")).filter(h=>h.id.startsWith("artistAchievement-")).map(h=>h.value.trim()).filter(h=>h.length>0)},c=Array.from(document.querySelectorAll("#edit-achievements-table tbody tr")).map((h,b)=>({award:h.querySelector(`#achieve-award-${b}`)?.value||"",venue:h.querySelector(`#achieve-venue-${b}`)?.value||"",year:+h.querySelector(`#achieve-year-${b}`)?.value||0,photo:this.achievementPreviews[b]||"",link:h.querySelector(`#achieve-link-${b}`)?.value||""})),s=Array.from(document.querySelectorAll("#edit-exhibitions-table tbody tr")).map((h,b)=>({title:h.querySelector(`#exhibit-title-${b}`)?.value||"",venue:h.querySelector(`#exhibit-venue-${b}`)?.value||"",date:h.querySelector(`#exhibit-date-${b}`)?.value||"",coverPhoto:this.exhibitionPreviews[b]||"",link:h.querySelector(`#exhibit-link-${b}`)?.value||""})),p=Array.from(document.querySelectorAll("#edit-mediamentions-table tbody tr")).map((h,b)=>({photo:this.mediamentionsPreviews[b]||"",description:h.querySelector(`#mediamention-description-${b}`)?.value||"",year:+h.querySelector(`#mediamention-year-${b}`)?.value||0,link:h.querySelector(`#mediamention-link-${b}`)?.value||""}));Object.assign(d,{achievements:c,exhibitions:s,mediamentions:p});let S=E`
            mutation UpdateContent($input: UpdateContentInput!) {
                updateContent(input: $input) {
                    id
                    code
                    quotation
                    homeintroduction
                    aboutintroductionpara1
                    aboutintroductionpara2
                    instagram
                    twitter
                    whatsapp
                    artistPhotoHome
                    artistPhotoAbout
                    artistAchievements
                    achievements {
                        award
                        venue
                        year
                        photo
                        link
                    }
                    exhibitions {
                        title
                        venue
                        date
                        coverPhoto
                        link
                    }
                    mediamentions {
                        photo
                        description
                        year
                        link
                    }
                }
            }
        `;this.dataService.mutate(S,{input:d}).subscribe({next:h=>{document.getElementById("edit-mode").style.display="none",document.getElementById("view-mode").style.display="block",this.selectedContent=h.updateContent,this.updateDOM()},error:h=>{console.error("Error saving content:",h)}})}static{this.\u0275fac=function(o){return new(o||y)(w(f))}}static{this.\u0275cmp=C({type:y,selectors:[["vdr-web-content"]],decls:272,vars:0,consts:[["id","view-mode",1,"content-view-mode"],[1,"form-container"],[1,"content-header-title"],["type","button",1,"btn-edit",3,"click"],[1,"toggle"],[1,"form-group"],["for","quotation"],["id","quotation",1,"content-detail"],["for","homeintroduction"],["id","homeintroduction",1,"content-detail"],[1,""],["id","artist-achievements-container",1,"achievements-container"],["id","artistPhotoHome",1,"content-photo-img"],["for","age"],["id","age",1,"content-detail"],["for","nationality"],["id","nationality",1,"content-detail"],["for","aboutintroductionpara1"],["id","aboutintroductionpara1",1,"content-detail"],["for","aboutintroductionpara2"],["id","aboutintroductionpara2",1,"content-detail"],["id","artistPhotoAbout",1,"content-photo-img"],["for","instagram"],["id","instagram-view",1,"content-detail"],["for","twitter"],["id","twitter-view",1,"content-detail"],["for","whatsapp"],["id","whatsapp-view",1,"content-detail"],["border","1","id","achievements-table",1,"content-table"],["border","1","id","exhibitions-table",1,"content-table"],["border","1","id","mediamentions-table",1,"content-table"],["id","edit-mode",1,"content-edit-mode",2,"display","none"],["id","quotation-edit","type","text","rows","8",1,"input-field"],["id","homeintroduction-edit","rows","8",1,"input-field"],["for","artistPhotoHome"],["type","file","onchange","onFileSelected(event, 'artistPhotoHome')",1,"file-input"],[1,"table-header"],["id","artist-achievements-list"],["type","button",1,"btn-add",3,"click"],["id","age-edit","type","number",1,"input-field"],["id","nationality-edit","type","text",1,"input-field"],["for","aboutintroductionpara1-edit"],["id","aboutintroductionpara1-edit","rows","8",1,"input-field"],["for","aboutintroductionpara2-edit"],["id","aboutintroductionpara2-edit","rows","8",1,"input-field"],["for","artistPhotoAbout"],["type","file","onchange","onFileSelected(event, 'artistPhotoAbout')",1,"file-input"],["id","instagram-edit","type","text",1,"input-field"],["id","twitter-edit","type","text",1,"input-field"],["id","whatsapp-edit","type","text",1,"input-field"],[1,"table-responsive-wrapper"],["id","edit-achievements-table",1,"edit-table"],["id","edit-exhibitions-table",1,"edit-table"],["type","button","onclick","addExhibitionRow()",1,"btn-add"],["id","edit-mediamentions-table",1,"edit-table"],[1,"save-btn"],["type","button",1,"btn-save",3,"click"]],template:function(o,i){o&1&&(t(0,"div",0)(1,"div",1)(2,"h1",2),n(3,"Manage website content"),e(),t(4,"button",3),x("click",function(){return i.enableEditing()}),n(5,"Edit"),e(),t(6,"h2"),n(7,"Homepage content"),e(),t(8,"details")(9,"summary",4),n(10,"click to view"),e(),t(11,"div")(12,"div",5)(13,"label",6)(14,"strong"),n(15,"Quote:"),e()(),m(16,"span",7),e(),t(17,"div",5)(18,"label",8)(19,"strong"),n(20,"Introduction:"),e()(),m(21,"span",9),e(),t(22,"div",5)(23,"h5",10)(24,"strong"),n(25,"Artist Achievements (for marquee animation)"),e()(),m(26,"div",11),e(),t(27,"div",5)(28,"strong"),n(29,"Artist Photo :"),e(),m(30,"br")(31,"img",12),e()()(),t(32,"h2"),n(33,"About page content"),e(),t(34,"details")(35,"summary",4),n(36,"click to view"),e(),t(37,"div")(38,"div",5)(39,"label",13)(40,"strong"),n(41,"Age:"),e()(),m(42,"span",14),e(),t(43,"div",5)(44,"label",15)(45,"strong"),n(46,"Nationality:"),e()(),m(47,"span",16),e(),t(48,"div",5)(49,"label",17)(50,"strong"),n(51,"Introduction Paragraph 1:"),e()(),m(52,"span",18),e(),t(53,"div",5)(54,"label",19)(55,"strong"),n(56,"Introduction Paragraph 2:"),e()(),m(57,"span",20),e(),t(58,"div",5)(59,"strong"),n(60,"Artist Photo:"),e(),m(61,"br")(62,"img",21),e(),t(63,"div",5)(64,"label",22)(65,"strong"),n(66,"Instagram:"),e()(),m(67,"span",23),e(),t(68,"div",5)(69,"label",24)(70,"strong"),n(71,"Twitter:"),e()(),m(72,"span",25),e(),t(73,"div",5)(74,"label",26)(75,"strong"),n(76,"WhatsApp:"),e()(),m(77,"span",27),e()()(),t(78,"h3"),n(79,"Achievements"),e(),t(80,"details")(81,"summary",4),n(82,"click to view"),e(),t(83,"table",28)(84,"thead")(85,"tr")(86,"th"),n(87,"Award"),e(),t(88,"th"),n(89,"Venue"),e(),t(90,"th"),n(91,"Year"),e(),t(92,"th"),n(93,"Photo"),e(),t(94,"th"),n(95,"Link"),e()()(),m(96,"tbody"),e()(),t(97,"h3"),n(98,"Exhibitions"),e(),t(99,"details")(100,"summary",4),n(101,"click to view"),e(),t(102,"table",29)(103,"thead")(104,"tr")(105,"th"),n(106,"Title"),e(),t(107,"th"),n(108,"Venue"),e(),t(109,"th"),n(110,"Date"),e(),t(111,"th"),n(112,"Cover Photo"),e(),t(113,"th"),n(114,"Link"),e()()(),m(115,"tbody"),e()(),t(116,"h3"),n(117,"Media mentions"),e(),t(118,"details")(119,"summary",4),n(120,"click to view"),e(),t(121,"table",30)(122,"thead")(123,"tr")(124,"th"),n(125,"Photo"),e(),t(126,"th"),n(127,"Description"),e(),t(128,"th"),n(129,"Year"),e(),t(130,"th"),n(131,"Link"),e()()(),m(132,"tbody"),e()()()(),t(133,"div",31)(134,"div",1)(135,"h2",2),n(136,"Edit Web Content"),e(),t(137,"h2"),n(138,"Homepage content"),e(),t(139,"details")(140,"summary",4),n(141,"click to view"),e(),t(142,"div",5)(143,"label",6),n(144,"Quotation: "),m(145,"input",32),e()(),t(146,"div",5)(147,"label",8),n(148,"Home Introduction: "),m(149,"textarea",33),e()(),t(150,"div",5)(151,"label",34),n(152,"Artist Photo (Home): "),m(153,"input",35),e(),m(154,"br"),e(),t(155,"h3",36),n(156,"Artist Achievements"),e(),t(157,"div",11),m(158,"ul",37),t(159,"button",38),x("click",function(){return i.addArtistAchievementRow()}),n(160,"Add Achievement"),e()()(),t(161,"h2"),n(162,"About page content"),e(),t(163,"details")(164,"summary",4),n(165,"click to view"),e(),t(166,"div",5)(167,"label",13),n(168,"Age: "),m(169,"input",39),e()(),t(170,"div",5)(171,"label",15),n(172,"Nationality: "),m(173,"input",40),e()(),t(174,"div",5)(175,"label",41),n(176,"Introduction Paragraph 1: "),m(177,"textarea",42),e()(),t(178,"div",5)(179,"label",43),n(180,"Introduction Paragraph 1: "),m(181,"textarea",44),e()(),t(182,"div",5)(183,"label",45),n(184,"Artist Photo: "),m(185,"input",46),e(),m(186,"br"),e(),t(187,"div",5)(188,"label",22),n(189,"Instagram: "),m(190,"input",47),e()(),t(191,"div",5)(192,"label",24),n(193,"Twitter: "),m(194,"input",48),e()(),t(195,"div",5)(196,"label",26),n(197,"WhatsApp: "),m(198,"input",49),e()()(),t(199,"h3"),n(200,"Achievements"),e(),t(201,"details")(202,"summary",4),n(203,"click to view"),e(),t(204,"div",50)(205,"table",51)(206,"thead")(207,"tr")(208,"th"),n(209,"Award"),e(),t(210,"th"),n(211,"Venue"),e(),t(212,"th"),n(213,"Year"),e(),t(214,"th"),n(215,"Photo"),e(),t(216,"th"),n(217,"Link"),e(),t(218,"th"),n(219,"Action"),e()()(),m(220,"tbody"),e()(),t(221,"button",38),x("click",function(){return i.addAchievementRow()}),n(222,"Add Achievement"),e()(),t(223,"h3"),n(224,"Exhibitions"),e(),t(225,"details")(226,"summary",4),n(227,"click to view"),e(),t(228,"div",50)(229,"table",52)(230,"thead")(231,"tr")(232,"th"),n(233,"Title"),e(),t(234,"th"),n(235,"Venue"),e(),t(236,"th"),n(237,"Date"),e(),t(238,"th"),n(239,"Cover Photo"),e(),t(240,"th"),n(241,"Link"),e(),t(242,"th"),n(243,"Action"),e()()(),m(244,"tbody"),e()(),t(245,"button",53),n(246,"Add Exhibition"),e()(),t(247,"h3"),n(248,"Media Mentions"),e(),t(249,"details")(250,"summary",4),n(251,"click to view"),e(),t(252,"div",50)(253,"table",54)(254,"thead")(255,"tr")(256,"th"),n(257,"Photo"),e(),t(258,"th"),n(259,"Description"),e(),t(260,"th"),n(261,"Year"),e(),t(262,"th"),n(263,"Link"),e(),t(264,"th"),n(265,"Action"),e()()(),m(266,"tbody"),e()(),t(267,"button",38),x("click",function(){return i.addMediaMentionRow()}),n(268,"Add Media Mention"),e()(),t(269,"div",55)(270,"button",56),x("click",function(){return i.saveChanges()}),n(271,"Save"),e()()()())},styles:[`.content-view-mode[_ngcontent-%COMP%], .content-edit-mode[_ngcontent-%COMP%]{padding:20px;color:#1a1a1a;width:90%;max-width:1200px;margin:auto;background-color:#fff}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.content-header-title[_ngcontent-%COMP%]{font-size:24px;font-weight:700;margin-bottom:16px;text-align:center;color:#306f94}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;margin-top:5px}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.content-detail[_ngcontent-%COMP%], .input-field[_ngcontent-%COMP%], .textarea-field[_ngcontent-%COMP%]{font-size:16px}.input-field[_ngcontent-%COMP%]{padding:8px;border:1px solid #ccc;border-radius:4px;width:100%;box-sizing:border-box}.textarea-field[_ngcontent-%COMP%]{padding:8px;border:1px solid #ccc;border-radius:4px;width:100%;height:80px;box-sizing:border-box}.content-photo-img[_ngcontent-%COMP%]{width:100px;height:100px;object-fit:cover;border-radius:4px;margin-top:8px}.file-input[_ngcontent-%COMP%]{font-size:14px;margin-top:8px}.table-header[_ngcontent-%COMP%]{font-size:18px;font-weight:700;margin-top:24px;color:#306f94}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{padding:10px;text-align:left;border:1px solid #ddd;word-wrap:break-word}th[_ngcontent-%COMP%]{background-color:#f4f4f4}.btn-edit[_ngcontent-%COMP%], .btn-save[_ngcontent-%COMP%], .btn-add[_ngcontent-%COMP%]{padding:10px 20px;font-size:16px;background-color:#306f94;color:#fff;border:none;border-radius:4px;cursor:pointer;max-width:200px;margin-top:20px;transition:background-color .3s ease}.btn-edit[_ngcontent-%COMP%]:hover, .btn-save[_ngcontent-%COMP%]:hover, .btn-add[_ngcontent-%COMP%]:hover{background-color:#1b445c}.btn-edit[_ngcontent-%COMP%]{width:100%}.btn-remove[_ngcontent-%COMP%]{background-color:red}.save-btn[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.content-view-mode[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%], .content-view-mode[_ngcontent-%COMP%]   .textarea-field[_ngcontent-%COMP%], .content-view-mode[_ngcontent-%COMP%]   .file-input[_ngcontent-%COMP%], .content-view-mode[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%], .content-view-mode[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]{display:none}.content-view-mode[_ngcontent-%COMP%]   .content-photo-img[_ngcontent-%COMP%]{display:block}.content-view-mode[_ngcontent-%COMP%]   .content-detail[_ngcontent-%COMP%]{display:inline-block;border:1px solid #525252;border-radius:2px;padding:10px;color:#333;font-size:14px;margin-top:5px}.toggle[_ngcontent-%COMP%]{color:#306f94}.content-edit-mode[_ngcontent-%COMP%]   .content-photo-img[_ngcontent-%COMP%]{display:block}.content-edit-mode[_ngcontent-%COMP%]   .content-detail[_ngcontent-%COMP%]{display:none}.content-edit-mode[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%], .content-edit-mode[_ngcontent-%COMP%]   .textarea-field[_ngcontent-%COMP%], .content-edit-mode[_ngcontent-%COMP%]   .file-input[_ngcontent-%COMP%]{display:block}.content-edit-mode[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%], .content-edit-mode[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]{display:inline-block}.content-table[_ngcontent-%COMP%], .edit-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-top:8px}.edit-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{max-width:20vw}@media (max-width: 768px){.content-view-mode[_ngcontent-%COMP%], .content-edit-mode[_ngcontent-%COMP%]{width:95%;padding:16px}.btn-edit[_ngcontent-%COMP%], .btn-save[_ngcontent-%COMP%], .btn-add[_ngcontent-%COMP%]{font-size:14px;padding:8px 16px}.form-group[_ngcontent-%COMP%]{gap:12px}.content-photo-img[_ngcontent-%COMP%]{width:80px;height:80px}}.table-responsive-wrapper[_ngcontent-%COMP%]{overflow-x:auto;-webkit-overflow-scrolling:touch;width:70vw}@media (max-width: 768px){.table-responsive-wrapper[_ngcontent-%COMP%]{width:90vw}}.edit-table[_ngcontent-%COMP%]{width:100%;min-width:300px;border-collapse:collapse}.edit-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .edit-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px 12px;border:1px solid #ddd;white-space:nowrap}
/*# sourceMappingURL=web-content.component-JAVI3BDF.css.map */`]})}}return y})();var M=[{path:"",component:P}],I=M;export{I as default};
//# sourceMappingURL=chunk-RFM6GQTL.js.map
