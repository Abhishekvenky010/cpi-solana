use std::iter;

use solana_program::{account_info::next_account_info,entrypoint, entrypoint::{AccountInfo, ProgramResult}, instruction::{AccountMeta, Instruction}, program::invoke, pubkey::Pubkey};



entrypoint!(program_instruction);
pub fn program_instruction(
    publicKey : &Pubkey,
    accounts : &[AccountInfo],
    instruction_data : &[u8]
)->ProgramResult{
    let mut iter = accounts.iter();
    let data_account = next_account_info(&mut iter)?;
    let doubleContract=next_account_info(&mut iter)?;
    let instruction = Instruction{
        program_id:doubleContract.key,
        accounts:vec![AccountMeta{
            is_signer:true,
            is_writable:true,
            pubkey : *data_account.key
        }],
        data:vec![]
    }
    invoke(&instruction, &[data_account.clone()])?;
    Ok(())
}