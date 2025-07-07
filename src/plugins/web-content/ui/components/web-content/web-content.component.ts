import { Component, OnInit } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import gql from 'graphql-tag';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';



interface Achievement {
    award: string;
    venue: string;
    year: number;
    photo: string;
    link:string;
}

interface Exhibition {
    coverPhoto: string;
    title: string;
    venue: string;
    date: string;
    link:string;
}

interface Mediamentions{
    photo:string;
    description:string;
    year:number;
    link:string;
}

interface Content {
    id: string;
    code: string;
    quotation?: string;
    homeintroduction?: string;
    artistAchievements?: string[];
    artistPhotoHome?: string;
    age?: number;
    nationality?: string;
    aboutintroductionpara1?: string;
    aboutintroductionpara2?: string;
    artistPhotoAbout?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
    achievements?: Achievement[];
    exhibitions?: Exhibition[];
    mediamentions?:Mediamentions[];
}

interface ContentsQueryResponse {
    contents: {
        items: Content[];
        totalItems: number;
    };
}

@Component({
    selector: 'vdr-web-content',
    templateUrl: './web-content.component.html',
    styleUrls: ['./web-content.component.scss'],
})

export class WebContentComponent implements OnInit {
    selectedContent: Content | null = null;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.loadContents();
        (window as any).enableEditing = this.enableEditing.bind(this);
        (window as any).angularComponent = this;
        (window as any).onFileSelected = this.onFileSelected.bind(this);
        (window as any).addExhibitionRow = this.addExhibitionRow.bind(this);
        (window as any).removeTableRow = this.removeTableRow.bind(this);
    }

    loadContents() {
        const GET_CONTENTS: TypedDocumentNode<ContentsQueryResponse> = gql`
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
        `;

        this.dataService
            .query(GET_CONTENTS)
            .mapStream((data) => data.contents.items)
            .subscribe({
                next: (contents) => {
                    console.log(contents)
                    if (contents.length > 0) {
                        this.selectedContent = { ...contents[0] };
                        this.updateDOM();
                    }
                },
                error: (err) => console.error('Error loading contents:', err),
            });
    }

    achievementPreviews: string[] = [];
    exhibitionPreviews: string[] = [];
    mediamentionsPreviews: string[] = [];


    renderTables() {
        const achievementsTable = document.querySelector('#achievements-table tbody')!;
        achievementsTable.innerHTML = '';
        this.selectedContent?.achievements?.forEach((a) => {
            achievementsTable.innerHTML += `
                <tr>
                    <td>${a.award}</td>
                    <td>${a.venue}</td>
                    <td>${a.year}</td>
                    <td><img src="${a.photo}" style="max-width:100px;" class="content-photo-img" /></td>
                    <td><a href="${a.link}" target="_blank">View</a></td>
                </tr>
            `;
        });

        const exhibitionsTable = document.querySelector('#exhibitions-table tbody')!;
        exhibitionsTable.innerHTML = '';
        this.selectedContent?.exhibitions?.forEach((e) => {
            exhibitionsTable.innerHTML += `
                <tr>
                    <td>${e.title}</td>
                    <td>${e.venue}</td>
                    <td>${e.date}</td>
                    <td><img src="${e.coverPhoto}"  style="max-width:100px;" class="content-photo-img" /></td>
                    <td><a href="${e.link}" target="_blank">View</a></td>
                </tr>
            `;
        });

        const mediaMentionsTable = document.querySelector('#mediamentions-table tbody');
        if (mediaMentionsTable) {
            mediaMentionsTable.innerHTML = '';
            this.selectedContent?.mediamentions?.forEach((m) => {
                mediaMentionsTable.innerHTML += `
                    <tr>
                        <td><img src="${m.photo}" style="max-width:100px;"  class="content-photo-img" /></td>
                        <td>${m.description}</td>
                        <td>${m.year}</td>
                        <td><a href="${m.link}" target="_blank">View</a></td>
                    </tr>
                `;
            });
        }

        const artistAchievementsList = document.getElementById('artist-achievements-container');
        if (artistAchievementsList) {
            artistAchievementsList.innerHTML = '';
            this.selectedContent?.artistAchievements?.forEach((achievement: string) => {
                const listItem = document.createElement('div');
                listItem.classList.add('achievement-item');
                listItem.textContent = achievement;
                artistAchievementsList.appendChild(listItem);
            });
        }
    }

    addArtistAchievementRow(){
        const list = document.getElementById('artist-achievements-list') as HTMLUListElement;
        const index = list.children.length;
    
        const li = document.createElement('li');
        li.className = 'achievement-item';
    
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-field';
        input.id = `artistAchievement-${index}`;
    
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.innerText = 'Remove';
        removeButton.className = 'btn-remove';
        removeButton.onclick = () => li.remove();
    
        li.appendChild(input);
        li.appendChild(removeButton);
    
        list.appendChild(li);
    }

    removeTableRow(type: 'achievement' | 'exhibition' | 'mediamentions', index: number): void {
        if (!this.selectedContent) return;
    
        console.log('Type:', type, 'Index:', index);
    
        if (type === 'achievement') {
            this.collectAchievementsFromTable();
            console.log('Before Removing:', this.selectedContent.achievements); 
    
            const achievements = [...this.selectedContent.achievements!];
            achievements.splice(index, 1);
            this.selectedContent.achievements = achievements;
    
            console.log('After Removing:', this.selectedContent.achievements);
        } else if (type === 'exhibition') {
            this.collectExhibitionsFromTable();
            console.log('Before Removing:', this.selectedContent.exhibitions);
    
            const exhibitions = [...this.selectedContent.exhibitions!];
            exhibitions.splice(index, 1);
            this.selectedContent.exhibitions = exhibitions;
            console.log(exhibitions)
    
            console.log('After Removing:', this.selectedContent.exhibitions);
        } else if (type === 'mediamentions') {
            this.collectMediaMentionsFromTable();
            console.log('Before Removing:', this.selectedContent.mediamentions);
    
            const mediamentions = [...this.selectedContent.mediamentions!];
            mediamentions.splice(index, 1);
            this.selectedContent.mediamentions = mediamentions;
    
            console.log('After Removing:', this.selectedContent.mediamentions);
        }
    
        this.enableEditing();
    }

    addAchievementRow() {
        this.collectAchievementsFromTable();
        const table = document.querySelector('#edit-achievements-table tbody')!;
        const index = table.children.length;

        this.achievementPreviews.push('');

        const row = document.createElement('tr');
        row.id = `achieve-${index}`;
        row.innerHTML = `
            <td><input type="text" id="achieve-award-${index}"  /></td>
            <td><input type="text" id="achieve-venue-${index}"  /></td>
            <td><input type="number" id="achieve-year-${index}"/></td>
            <td>
                <input type="file" onchange="angularComponent.onFileSelected(event, 'achievement', ${index})"style="width: 100px; height: 100px;" /> <br>
                <img src="${this.achievementPreviews[index]}" class="preview-img content-photo-img"  />
            </td>
            <td><input type="text" id="achieve-link-${index}"  /></td>
            <td><button type="button" onclick="removeTableRow('achievement', ${index})">Remove</button></td>
        `;
        table.appendChild(row);
    }

    collectAchievementsFromTable() {
        const rows = document.querySelectorAll('#edit-achievements-table tbody tr');
        const achievements: any[] = [];

        rows.forEach((row, index) => {
            const award = (row.querySelector(`#achieve-award-${index}`) as HTMLInputElement)?.value || '';
            const venue = (row.querySelector(`#achieve-venue-${index}`) as HTMLInputElement)?.value || '';
            const year = parseInt((row.querySelector(`#achieve-year-${index}`) as HTMLInputElement)?.value) || null;
            const link = (row.querySelector(`#achieve-link-${index}`) as HTMLInputElement)?.value || '';
            const photo = this.achievementPreviews[index] || '';

            achievements.push({ award, venue, year, link, photo });
        });

        this.selectedContent && (this.selectedContent.achievements = achievements);

    }

    addExhibitionRow() {
        this.collectExhibitionsFromTable();
    
        const table = document.querySelector('#edit-exhibitions-table tbody')!;
        const index = table.children.length;
    
        this.exhibitionPreviews.push('');
    
        const row = document.createElement('tr');
        row.id = `exhibit-${index}`;
        row.innerHTML = `
            <td><input type="text" id="exhibit-title-${index}"  /></td>
            <td><input type="text" id="exhibit-venue-${index}" /></td>
            <td><input type="text" id="exhibit-date-${index}" /></td>
            <td>
                <input type="file" onchange="angularComponent.onFileSelected(event, 'exhibition', ${index})" style="width: 100px; "/ > <br>
                <img src="${this.exhibitionPreviews[index]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;" />
            </td>
            <td><input type="text" id="exhibit-link-${index}" /></td>
            <td><button type="button" onclick="removeTableRow('exhibition', ${index})">Remove</button></td>
        `;
        table.appendChild(row);
    }

    collectExhibitionsFromTable() {
    const rows = document.querySelectorAll('#edit-exhibitions-table tbody tr');
    const exhibitions: any[] = [];

    rows.forEach((row, index) => {
        const title = (row.querySelector(`#exhibit-title-${index}`) as HTMLInputElement)?.value || '';
        const venue = (row.querySelector(`#exhibit-venue-${index}`) as HTMLInputElement)?.value || '';
        const date = (row.querySelector(`#exhibit-date-${index}`) as HTMLInputElement)?.value || '';
        const link = (row.querySelector(`#exhibit-link-${index}`) as HTMLInputElement)?.value || '';
        const coverPhoto = this.exhibitionPreviews[index] || '';

        exhibitions.push({ title, venue, date, link, coverPhoto });
    });

    this.selectedContent && (this.selectedContent.exhibitions = exhibitions);
    }

    addMediaMentionRow() {
        this.collectMediaMentionsFromTable();

        const table = document.querySelector('#edit-mediamentions-table tbody')!;
        const index = table.children.length;

        this.mediamentionsPreviews.push('');

        const row = document.createElement('tr');
        row.id = `mediamention-${index}`;
        row.innerHTML = `
            <td>
                <input type="file" onchange="angularComponent.onFileSelected(event, 'mediamentions', ${index})" style="width:100px; " /> <br>
                <img src="${this.mediamentionsPreviews[index]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;" />
            </td>
            <td><input type="text" id="mediamention-description-${index}" /></td>
            <td><input type="text" id="mediamention-year-${index}" /></td>
            <td><input type="text" id="mediamention-link-${index}"/></td>
            <td><button type="button" onclick="removeTableRow('mediamention', ${index})">Remove</button></td>
        `;
        table.appendChild(row);
    }

    collectMediaMentionsFromTable() {
        const rows = document.querySelectorAll('#edit-mediamentions-table tbody tr');
        const mediaMentions: any[] = [];
    
        rows.forEach((row, index) => {
            const description = (row.querySelector(`#mediamention-description-${index}`) as HTMLInputElement)?.value || '';
            const year = (row.querySelector(`#mediamention-year-${index}`) as HTMLInputElement)?.value || '';
            const link = (row.querySelector(`#mediamention-link-${index}`) as HTMLInputElement)?.value || '';
            const photo = this.mediamentionsPreviews[index] || '';
    
            mediaMentions.push({ photo, description, year, link });
        });

        console.log(mediaMentions)
    
        this.selectedContent && (this.selectedContent.mediamentions = mediaMentions);

    }

    updateDOM() {
        if (!this.selectedContent) return;
        const c = this.selectedContent;

        (document.getElementById('quotation') as HTMLElement).innerText = c.quotation || '';
        (document.getElementById('homeintroduction') as HTMLElement).innerText = c.homeintroduction || '';
        (document.getElementById('artistPhotoHome') as HTMLImageElement).src = c.artistPhotoHome || '';
        (document.getElementById('age') as HTMLElement).innerText = c.age?.toString() || '';
        (document.getElementById('nationality') as HTMLElement).innerText = c.nationality || '';
        (document.getElementById('aboutintroductionpara1') as HTMLElement).innerText = c.aboutintroductionpara1 || '';
        (document.getElementById('aboutintroductionpara2') as HTMLElement).innerText = c.aboutintroductionpara2 || '';
        (document.getElementById('artistPhotoAbout') as HTMLImageElement).src = c.artistPhotoAbout || '';
        (document.getElementById('instagram-view') as HTMLElement).innerText = c.instagram || '';
        (document.getElementById('twitter-view') as HTMLElement).innerText = c.twitter || '';
        (document.getElementById('whatsapp-view') as HTMLElement).innerText = c.whatsapp || '';
    
        this.renderTables();
    }

    enableEditing() {
        if (!this.selectedContent) return;
        const c = this.selectedContent;
    
        // Set basic field values
        (document.getElementById('quotation-edit') as HTMLInputElement).value = c.quotation ?? '';
        (document.getElementById('homeintroduction-edit') as HTMLTextAreaElement).value = c.homeintroduction ?? '';
        (document.getElementById('aboutintroductionpara1-edit') as HTMLTextAreaElement).value = c.aboutintroductionpara1 ?? '';
        (document.getElementById('aboutintroductionpara2-edit') as HTMLTextAreaElement).value = c.aboutintroductionpara2 ?? '';
        (document.getElementById('instagram-edit') as HTMLInputElement).value = c.instagram ?? '';
        (document.getElementById('twitter-edit') as HTMLInputElement).value = c.twitter ?? '';
        (document.getElementById('whatsapp-edit') as HTMLInputElement).value = c.whatsapp ?? '';
        (document.getElementById('age-edit') as HTMLInputElement).value = c.age?.toString() ?? '';
        (document.getElementById('nationality-edit') as HTMLInputElement).value = c.nationality ?? '';
    
        (document.getElementById('artistPhotoHome') as HTMLInputElement).value = c.artistPhotoHome ?? '';
        (document.getElementById('artistPhotoAbout') as HTMLInputElement).value = c.artistPhotoAbout ?? '';

        const artistAchievementsList = document.getElementById('artist-achievements-list') as HTMLUListElement;
        artistAchievementsList.innerHTML = '';
    
        c.artistAchievements?.forEach((achievement: string, index: number) => {
            const li = document.createElement('li');
            li.className = 'achievement-item';
    
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'input-field';
            input.id = `artistAchievement-${index}`;
            input.value = achievement;
    
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.innerText = 'Remove';
            removeButton.className = 'btn-remove';
            removeButton.onclick = () => li.remove();
    
            li.appendChild(input);
            li.appendChild(removeButton);
    
            artistAchievementsList.appendChild(li);
        });

        const achievementsTableBody = document.querySelector('#edit-achievements-table tbody')!;
        achievementsTableBody.innerHTML = '';
        this.achievementPreviews = c.achievements?.map((a: any) => a.photo || '') || [];
        c.achievements?.forEach((a: any, i: number) => {
            const row = document.createElement('tr');
            row.id = `achieve-${i}`;
            row.innerHTML = ` <td><input type="text" id="achieve-award-${i}" value="${a.award || ''}" /></td>
                <td><input type="text" id="achieve-venue-${i}" value="${a.venue || ''}" /></td>
                <td><input type="text" id="achieve-year-${i}" value="${a.year || ''}" /></td>
                <td>
                    <input type="file" onchange="onFileSelected(event, 'achievement', ${i})"  style="width:120px"/> <br>
                    <img src="${this.achievementPreviews[i]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;"/>
                </td>
                <td><input type="text" id="achieve-link-${i}" value="${a.link || ''}" /></td>
                <td><button type="button" onclick="removeTableRow('achievement', ${i})">Remove</button></td>
            `;
            achievementsTableBody.appendChild(row);
        });
        const exhibitionsTableBody = document.querySelector('#edit-exhibitions-table tbody')!;
        exhibitionsTableBody.innerHTML = '';
        this.exhibitionPreviews = c.exhibitions?.map((e: any) => e.coverPhoto || '') || [];
        c.exhibitions?.forEach((e: any, i: number) => {
            const row = document.createElement('tr');
            row.id = `exhibit-${i}`;
            row.innerHTML = `
                <td><input type="text" id="exhibit-title-${i}" value="${e.title || ''}" /></td>
                <td><input type="text" id="exhibit-venue-${i}" value="${e.venue || ''}" /></td>
                <td><input type="text" id="exhibit-date-${i}" value="${e.date || ''}" /></td>
                <td>
                    <input type="file" onchange="onFileSelected(event, 'exhibition', ${i})" style="width:120px" /> <br>
                    <img src="${this.exhibitionPreviews[i]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;" />
                </td>
                <td><input type="text" id="exhibit-link-${i}" value="${e.link || ''}" /></td>
                <td><button type="button" onclick="removeTableRow('exhibition', ${i})">Remove</button></td>
            `;
            exhibitionsTableBody.appendChild(row);
        });

        const mediaMentionsTableBody = document.querySelector('#edit-mediamentions-table tbody')!;
        mediaMentionsTableBody.innerHTML = '';
        this.mediamentionsPreviews = c.mediamentions?.map((m: any) => m.photo || '') || [];

        c.mediamentions?.forEach((m: any, i: number) => {
            const row = document.createElement('tr');
            row.id = `mediamention-${i}`;
            row.innerHTML = `
                <td>
                    <input type="file" onchange="onFileSelected(event, 'mediamentions', ${i})" style="width:120px" /> <br>
                    <img src="${this.mediamentionsPreviews[i]}" class="preview-img content-photo-img" style="width: 100px; height: 100px;"/>
                </td>
                <td><input type="text" id="mediamention-description-${i}" value="${m.description || ''}" /></td>
                <td><input type="number" id="mediamention-year-${i}" value="${m.year || ''}" /></td>
                <td><input type="text" id="mediamention-link-${i}" value="${m.link || ''}" /></td>
                <td><button type="button" onclick="removeTableRow('mediamentions', ${i})">Remove</button></td>
            `;
            mediaMentionsTableBody.appendChild(row);
        });

        (document.getElementById('view-mode') as HTMLElement).style.display = 'none';
        (document.getElementById('edit-mode') as HTMLElement).style.display = 'block';
    }

    onFileSelected(
        event: Event,
        type: 'achievement' | 'exhibition' | 'mediamentions' | 'artistPhotoHome' | 'artistPhotoAbout',
        index?: number
    ) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const UPLOAD_IMAGE = gql`
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
            `;
            this.dataService.mutate(UPLOAD_IMAGE, { input: [{ file }] }).subscribe({
                next: (res: any) => {
                    const asset = res.createAssets?.[0];
                    if (asset && 'source' in asset) {
                        const imageUrl = asset.source;
    
                        if (type === 'achievement' && typeof index === 'number') {
                            this.achievementPreviews[index] = asset.preview || imageUrl;
                            if (this.selectedContent?.achievements?.[index]) {
                                const updatedAchievements = [...this.selectedContent.achievements];
                                updatedAchievements[index] = {
                                    ...updatedAchievements[index],
                                    photo: imageUrl,
                                };
                                this.selectedContent = {
                                    ...this.selectedContent,
                                    achievements: updatedAchievements,
                                };
                            }
                        } else if (type === 'exhibition' && typeof index === 'number') {
                            this.exhibitionPreviews[index] = asset.preview || imageUrl;
                            if (this.selectedContent?.exhibitions?.[index]) {
                                const updatedExhibitions = [...this.selectedContent.exhibitions];
                                updatedExhibitions[index] = {
                                    ...updatedExhibitions[index],
                                    coverPhoto: imageUrl,
                                };
                                this.selectedContent = {
                                    ...this.selectedContent,
                                    exhibitions: updatedExhibitions,
                                };
                            }
                        } else if (type === 'mediamentions' && typeof index === 'number') {
                            this.mediamentionsPreviews[index] = asset.preview || imageUrl;
                            if (this.selectedContent?.mediamentions?.[index]) {
                                const updatedMentions = [...this.selectedContent.mediamentions];
                                updatedMentions[index] = {
                                    ...updatedMentions[index],
                                    photo: imageUrl,
                                };
                                this.selectedContent = {
                                    ...this.selectedContent,
                                    mediamentions: updatedMentions,
                                };
                            console.log(this.mediamentionsPreviews);
                            }
                        } else if (type === 'artistPhotoHome') {
                            (document.getElementById('artistPhotoHome') as HTMLInputElement).value = imageUrl;
                        } else if (type === 'artistPhotoAbout') {
                            (document.getElementById('artistPhotoAbout') as HTMLInputElement).value = imageUrl;
                        }
                    }
                },
                error: (err) => console.error('Image upload failed:', err),
            });
        }
    }

    saveChanges() {
        if (!this.selectedContent) return;
        const age = (document.getElementById('age-edit') as HTMLInputElement)?.value || '0';
        const ageInt = parseInt(age, 10);
        const finalAge = isNaN(ageInt) ? 0 : ageInt;
    
        const input = {
            id: this.selectedContent.id,
            code: this.selectedContent.code || '',
            quotation: (document.getElementById('quotation-edit') as HTMLInputElement)?.value || '',
            homeintroduction: (document.getElementById('homeintroduction-edit') as HTMLTextAreaElement)?.value || '',
            aboutintroductionpara1: (document.getElementById('aboutintroductionpara1-edit') as HTMLTextAreaElement)?.value || '',
            aboutintroductionpara2: (document.getElementById('aboutintroductionpara2-edit') as HTMLTextAreaElement)?.value || '',
            age: finalAge,
            nationality: (document.getElementById('nationality-edit') as HTMLInputElement)?.value || '',
            instagram: (document.getElementById('instagram-edit') as HTMLInputElement)?.value || '',
            twitter: (document.getElementById('twitter-edit') as HTMLInputElement)?.value || '',
            whatsapp: (document.getElementById('whatsapp-edit') as HTMLInputElement)?.value || '',
            artistPhotoHome: (document.getElementById('artistPhotoHome') as HTMLInputElement)?.value || '',
            artistPhotoAbout: (document.getElementById('artistPhotoAbout') as HTMLInputElement)?.value || '',
            artistAchievements: Array.from(document.querySelectorAll('#artist-achievements-list input'))
                .filter(input => input.id.startsWith('artistAchievement-'))
                .map(input => (input as HTMLInputElement).value.trim())
                .filter(val => val.length > 0),
        };
    
        const achievementRows = Array.from(document.querySelectorAll('#edit-achievements-table tbody tr'));
        const achievements = achievementRows.map((row, index) => ({
            award: (row.querySelector(`#achieve-award-${index}`) as HTMLInputElement)?.value || '',
            venue: (row.querySelector(`#achieve-venue-${index}`) as HTMLInputElement)?.value || '',
            year: +(row.querySelector(`#achieve-year-${index}`) as HTMLInputElement)?.value || 0,
            photo: this.achievementPreviews[index] || '',
            link: (row.querySelector(`#achieve-link-${index}`) as HTMLInputElement)?.value || '',
        }));
    
        const exhibitionRows = Array.from(document.querySelectorAll('#edit-exhibitions-table tbody tr'));
        const exhibitions = exhibitionRows.map((row, index) => ({
            title: (row.querySelector(`#exhibit-title-${index}`) as HTMLInputElement)?.value || '',
            venue: (row.querySelector(`#exhibit-venue-${index}`) as HTMLInputElement)?.value || '',
            date: (row.querySelector(`#exhibit-date-${index}`) as HTMLInputElement)?.value || '',
            coverPhoto: this.exhibitionPreviews[index] || '',
            link: (row.querySelector(`#exhibit-link-${index}`) as HTMLInputElement)?.value || '',
        }));
    
        const mediaMentionRows = Array.from(document.querySelectorAll('#edit-mediamentions-table tbody tr'));
        const mediamentions = mediaMentionRows.map((row, index) => ({
            photo: this.mediamentionsPreviews[index] || '',
            description: (row.querySelector(`#mediamention-description-${index}`) as HTMLInputElement)?.value || '',
            year: +(row.querySelector(`#mediamention-year-${index}`) as HTMLInputElement)?.value || 0,
            link: (row.querySelector(`#mediamention-link-${index}`) as HTMLInputElement)?.value || '',
        }));
    
        Object.assign(input, { achievements, exhibitions, mediamentions });
    
        const UPDATE_CONTENT = gql`
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
        `;
    
        this.dataService.mutate(UPDATE_CONTENT, { input }).subscribe({
            next: (response: any) => {
                (document.getElementById('edit-mode') as HTMLElement).style.display = 'none';
                (document.getElementById('view-mode') as HTMLElement).style.display = 'block';
                this.selectedContent = response.updateContent;
                this.updateDOM();
            },
            error: (err) => {
                console.error('Error saving content:', err);
            },
        });
    }

}
