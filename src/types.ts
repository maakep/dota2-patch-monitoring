export interface Dota {
  patches?: PatchesEntity[] | null;
  success: boolean;
}
export interface PatchesEntity {
  patch_number: string;
  patch_name: string;
  patch_timestamp: number;
  patch_website?: string | null;
  patch_website_anchor?: string | null;
}
