import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../../services/title.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";
import {FediseerApiService} from "../../../services/fediseer-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {toPromise} from "../../../types/resolvable";
import {TranslatorService} from "../../../services/translator.service";
import {ApiResponseHelperService} from "../../../services/api-response-helper.service";
import {CachedFediseerApiService} from "../../../services/cached-fediseer-api.service";
import {AuthenticationManagerService} from "../../../services/authentication-manager.service";

@Component({
  selector: 'app-endorse-instance',
  templateUrl: './endorse-instance.component.html',
  styleUrls: ['./endorse-instance.component.scss']
})
export class EndorseInstanceComponent implements OnInit {
  public form = new FormGroup({
    instance: new FormControl<string>('', [Validators.required]),
    reasons: new FormControl<string[]>([]),
  });
  public loading: boolean = true;
  public availableReasons: string[] = [];

  constructor(
    private readonly titleService: TitleService,
    private readonly messageService: MessageService,
    private readonly api: FediseerApiService,
    private readonly cachedApi: CachedFediseerApiService,
    private readonly router: Router,
    private readonly translator: TranslatorService,
    private readonly apiResponseHelper: ApiResponseHelperService,
    private readonly authManager: AuthenticationManagerService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }
  public async ngOnInit(): Promise<void> {
    this.titleService.title = this.translator.get('app.endorsements.add.title');

    this.activatedRoute.queryParams.subscribe(query => {
      if (!query['instance']) {
        return;
      }

      this.form.patchValue({instance: query['instance']});
    });
    const reasons = await toPromise(this.cachedApi.getUsedEndorsementReasons());
    if (reasons === null) {
      this.messageService.createWarning(this.translator.get('error.reasons.autocompletion.fetch'));
    } else {
      this.availableReasons = reasons;
    }

    this.loading = false;
  }

  public async doEndorse(): Promise<void> {
    if (!this.form.valid) {
      this.messageService.createError(this.translator.get('error.form_invalid.generic'));
      return;
    }

    this.loading = true;
    this.api.endorseInstance(
      this.form.controls.instance.value!,
      this.form.controls.reasons.value ? this.form.controls.reasons.value!.join(',') : null,
    ).subscribe(response => {
      if (this.apiResponseHelper.handleErrors([response])) {
        this.loading = false;
        return;
      }

      this.cachedApi.getEndorsementsByInstances([this.authManager.currentInstanceSnapshot.name], {clear: true})
        .subscribe(() => {
          this.loading = false;
          this.router.navigateByUrl('/endorsements/my').then(() => {
            this.messageService.createSuccess(this.translator.get('app.endorsements.success.create'));
          });
        });
    });
  }
}
