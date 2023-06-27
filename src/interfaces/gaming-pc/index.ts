import { BookingInterface } from 'interfaces/booking';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface GamingPcInterface {
  id?: string;
  name: string;
  availability: boolean;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  organization?: OrganizationInterface;
  _count?: {
    booking?: number;
  };
}

export interface GamingPcGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
