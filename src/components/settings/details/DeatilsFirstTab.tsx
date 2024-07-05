import React from 'react';
import Switch from './TableSwitcher';
import { useTranslation } from 'react-i18next';

interface StoragePath {
  id: number;
  component: string;
  mount: string;
  name: string;
}

interface SwitchStates {
  [key: number]: boolean;
}

interface DetailsFirstTabProps {
  newState: SwitchStates;
  setNewState: React.Dispatch<React.SetStateAction<SwitchStates>>;
}

const DetailsFirstTab: React.FC<DetailsFirstTabProps> = ({ newState, setNewState }) => {
  const { t } = useTranslation();

  const storagePaths: StoragePath[] = [
    { id: 1, component: t("Services"), mount: t('Photo_process'), name: t('Ability_to_add_change_delete_photo_to_the_procedure') },
    { id: 2, component: t('Services'), mount: t('Additional_service_category'), name: t('Ability_to_add_multiple_service_categories_and_multiple_specializations') },
    { id: 3, component: t('Online_booking'), mount: t('Permission_to_record_clients'), name: t('Ability_to_allow_or_deny_clients_to_book') },
    { id: 4, component: t('Online_booking'), mount: t('Booking_duration_by_days'), name: t('Ability_to_set_booking_days') },
    { id: 5, component: t('Online_booking'), mount: t('Booking_duration_for_a_period'), name: t('Ability_to_set_booking_periods') },
    { id: 6, component: t('Online_booking'), mount: t('Break_between_sessions_for_all_procedures'), name: t('Ability_to_set_the_same_breaks_between_sessions') },
    { id: 7, component: t('Online_booking'), mount: t('Break_between_sessions_for_each_procedure'), name: t('Ability_to_set_different_breaks_between_sessions') },
    { id: 8, component: t('Online_booking'), mount: t('Confirmation_of_booking_for_all_clients'), name: t('Ability_to_confirm_bookings_for_all_clients') },
    { id: 9, component: t('Online_booking'), mount: t('Confirmation_of_booking_for_new_clients'), name: t('Ability_to_confirm_bookings_for_new_clients') },
    { id: 10, component: t('Online_booking'), mount: t('Do_not_confirm_bookings'), name: t('Ability_to_not_confirm_bookings') },
    { id: 11, component: t('Online_booking'), mount: t('Request_a_slot_for_all_clients'), name: t('Ability_to_book_in_the_waiting_room_for_all_clients') },
    { id: 12, component: t('Online_booking'), mount: t('Request_a_slot_for_regular_clients'), name: t('Ability_to_book_in_the_waiting_room_for_regular_clients') },
    { id: 13, component: t('Online_booking'), mount: t('Time_for_VIP_clients'), name: t('Ability_to_plan_time_for_VIP_clients') },
    { id: 14, component: t('Online_booking'), mount: t('Setting_up_online_payment_acceptance'), name: t('Ability_to_enable_or_disable_online_payment') },
    { id: 15, component: t('Online_booking'), mount: t('Prepayment_setting_percentage'), name: t('Ability_to_set_prepayment_as_a_percentage') },
    { id: 16, component: t('Online_booking'), mount: t('Prepayment_setting_fixed'), name: t('Ability_to_set_prepayment_as_fixed') },
    { id: 17, component: t('Notifications'), mount: t('Remind_of_booking'), name: t('Ability_to_set_templates_and_remind_the_client_about_the_booking') },
    { id: 18, component: t('Notifications'), mount: t('Booking_cancellation'), name: t('Ability_to_set_templates_and_remind_the_client_of_booking_cancellation') },
    { id: 19, component: t('Notifications'), mount: t('Booking_change'), name: t('Ability_to_set_templates_and_remind_the_client_of_booking_change') },
    { id: 20, component: t('Notifications'), mount: t('Birthday_greeting'), name: t('Ability_to_set_a_greeting_template_and_send_to_clients') },
    { id: 21, component: t('Notifications'), mount: t('Stopped_visiting'), name: t('Ability_to_remind_clients_who_stopped_visiting') },
    { id: 22, component: t('Notifications'), mount: t('Waiting_room'), name: t('Ability_to_set_a_template_for_inviting_to_the_waiting_room') },
    { id: 23, component: t('Clients'), mount: t('Clients_from_the_address_book'), name: t('Ability_to_add_clients_from_the_phone') },
    { id: 24, component: t('Clients'), mount: t('New_client_status'), name: t('Ability_to_identify_a_client_as_new') },
    { id: 25, component: t('Clients'), mount: t('Regular_client_status'), name: t('Ability_to_identify_a_client_as_regular') },
    { id: 26, component: t('Clients'), mount: t('Client_not_visited_status'), name: t('Ability_to_identify_a_client_who_has_not_visited_the_master') },
    { id: 27, component: t('Clients'), mount: t('Stopped_visiting_status'), name: t('Ability_to_identify_a_client_who_stopped_visiting') },
    { id: 28, component: t('Payment_methods'), mount: t('Card_management'), name: t('Ability_to_add_remove_bank_cards') },
    { id: 29, component: t('Web_page'), mount: t('Web_page_link'), name: t('Ability_to_send_a_link_to_clients_on_the_master_profile') },
    { id: 30, component: t('Finance'), mount: t('Finance_expenses_top_client_list'), name: t('Ability_to_create_expenses_for_financial_calculation_and_get_information_on_financial_status') },
    { id: 31, component: t('Schedule'), mount: t('Stop_booking'), name: t('Ability_to_stop_booking_for_a_selected_day_date') },
    { id: 32, component: t('Schedule'), mount: t('Book_a_client'), name: t('Ability_for_the_master_to_book_clients') },
    { id: 33, component: t('Schedule'), mount: t('Make_a_day_off'), name: t('Ability_for_the_master_to_make_any_day_off') },
  ];

  const toggleSwitch = (id: number) => {
    setNewState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-[#d0eeff] h-10'>
            <th className='text-start px-4'>{t('Functionality_Category')}</th>
            <th className='text-start px-4'>{t('Functional')}</th>
            <th className='text-start px-4'>{t('Description')}</th>
            <th className='text-start px-4'>{t('Status')}</th>
          </tr>
        </thead>
        <tbody>
          {storagePaths.map((path) => (
            <tr key={path.id}>
              <td className='px-4 py-7 dark:text-white'>{path.component}</td>
              <td className='px-4 py-7 dark:text-white'>{path.mount}</td>
              <td className='px-4 py-7 dark:text-white'>{path.name}</td>
              <td className='px-4 py-7 dark:text-white'>
                <Switch isOn={!!newState[path.id]} handleToggle={() => toggleSwitch(path.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsFirstTab;
