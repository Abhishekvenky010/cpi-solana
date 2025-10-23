use borsh::{BorshSerialize, BorshDeserialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::{ ProgramResult},
    entrypoint,
    pubkey::Pubkey,
};

entrypoint!(process);
#[derive(BorshDeserialize, BorshSerialize)]
struct OnChainData{
    count: u32
}
 fn process(
    programId : &Pubkey,
    accounts :&[AccountInfo],
    instrucion_data:&[u8]
 )->ProgramResult{
    let mut iter = accounts.iter();
    let data_account = next_account_info(&mut iter)?;
    if(data_account.is_signer != true){
        return Err(solana_program::program_error::ProgramError::MissingRequiredSignature)
    }
    let mut counter =OnChainData::try_from_slice(&data_account.data.borrow_mut())?;
    if counter.count == 0{
        counter.count =1;
    }else{
        counter.count = counter.count*2;
    }
    counter.serialize(&mut *data_account.data.borrow_mut());
    Ok(())
 }