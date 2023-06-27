import { GamingPcInterface } from 'interfaces/gaming-pc';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_time: any;
  end_time: any;
  gaming_pc_id?: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  gaming_pc?: GamingPcInterface;
  user?: UserInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  gaming_pc_id?: string;
  customer_id?: string;
}
