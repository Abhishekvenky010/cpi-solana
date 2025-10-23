import { test } from "node:test";
import { LiteSVM } from "litesvm";
import {
	PublicKey,
	Transaction,
	SystemProgram,
	Keypair,
	LAMPORTS_PER_SOL,
	TransactionInstruction,
} from "@solana/web3.js";

test("one transfer", () => {
	const svm = new LiteSVM();
	const contractPubKey = PublicKey.unique();
	svm.addProgramFromFile(contractPubKey,"/double.so");
	const payer = new Keypair(); 
	svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));
	const dataAccount = new Keypair();
	const blockhash = svm.latestBlockhash();
	const transferLamports = 1_000_000;
	const ixs = [
		SystemProgram.createAccount({
			fromPubkey: payer.publicKey,
			newAccountPubkey: dataAccount.publicKey,
			lamports:Number(svm.minimumBalanceForRentExemption(BigInt(4))),
			space: 4,
			programId:contractPubKey
		}),
	];
	const tx = new Transaction();
	tx.recentBlockhash = blockhash;
	tx.feePayer = payer.publicKey;
	tx.add(...ixs);
	tx.sign(payer,dataAccount);
	svm.sendTransaction(tx);
	const balanceAfter = svm.getBalance(dataAccount.publicKey);
	expect(balanceAfter).toBe(svm.minimumBalanceForRentExemption(BigInt(4));
	
	
	function  doublenum(){const ix2 =new TransactionInstruction({
		keys :[
			{pubkey:dataAccount.publicKey,isSigner:false,isWritable:true}
		],
		programId:contractPubKey,
		data:Buffer.from("")
	})
	const blockhash1 = svm.latestBlockhash();
		const tx2 = new Transaction();
		tx2.recentBlockhash = blockhash1;
		tx2.feePayer = payer.publicKey;
		tx2.add(ix2);
	    tx2.sign(payer);
	    svm.sendTransaction(tx2);


	}

doublenum();