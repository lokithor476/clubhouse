export interface RegisterOrganizationFormState {
  inputs: {
    description: string;
    logo: string;
    name: string;
    slug: string;
  };
  errors: {
    description?: string[];
    logo?: string[];
    name?: string[];
    slug?: string[];
  };
  success: boolean;
}
