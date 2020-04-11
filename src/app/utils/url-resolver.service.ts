import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const BACKEND_API = environment.apiUrl;

@Injectable()
export class URLResolverService {
  getProfilePictureURL(userId: string): string {
    const url = `${BACKEND_API}/files/profile-picture/${userId}`;
    return url;
  }
}
