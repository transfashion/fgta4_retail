<?php namespace FGTA4;

class SyncBase {



	protected function getDataFromUrl(string $endpoint) : array {
		try {
			$ch = curl_init($endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			// curl_setopt($ch, CURLINFO_HEADER_OUT, true);
			$respond = curl_exec($ch);
			curl_close($ch);	

			$res = json_decode($respond, true);
			if ($res['code']!=0) {
				throw new \Exception($res['message'], $res['code']);
			}

			$json_data = gzuncompress(base64_decode($res['data']));
			$data = json_decode($json_data, true);

			return $data;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
}